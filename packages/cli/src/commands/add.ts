// Heavily based on https://github.com/shadcn-ui/ui/blob/main/packages/cli/src/commands/add.ts
import chalk from 'chalk';
import { Command } from 'commander';
import { existsSync, promises as fs } from 'fs';
import ora from 'ora';
import path from 'path';
import prompts from 'prompts';
import * as z from 'zod';

import { handleError } from '@/src/utils/handle-error';
import { logger } from '@/src/utils/logger';
import { ALL_COMPONENTS, fetchComponents } from '@/src/utils/registry';

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
  path: z.string().optional(),
});

export const add = new Command()
  .name('add')
  .description('add a component to your project')
  .argument('[components...]', 'the components to add')
  .option('-y, --yes', 'skip confirmation prompt.', true)
  .option('-o, --overwrite', 'overwrite existing files.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd()
  )
  .option('-a, --all', 'add all available components', false)
  .option('-p, --path <path>', 'the path to add the component to.')
  .action(async (components, opts) => {
    try {
      const options = addOptionsSchema.parse({
        components,
        ...opts,
      });

      const cwd = path.resolve(options.cwd);

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
      }

      let selectedComponents = options.all
        ? ALL_COMPONENTS
        : options.components;

      // If no components were passed in command, prompt the user.
      if (!options.components?.length && !options.all) {
        const { components } = await prompts({
          type: 'multiselect',
          name: 'components',
          message: 'Which components would you like to add?',
          hint: 'Space to select. A to toggle all. Enter to submit.',
          instructions: false,
          choices: ALL_COMPONENTS.map(component => ({
            title: component,
            value: component,
          })),
        });
        selectedComponents = components;
      }

      if (!selectedComponents?.length) {
        logger.warn('No components selected. Exiting.');
        process.exit(0);
      }

      if (!options.yes) {
        const { proceed } = await prompts({
          type: 'confirm',
          name: 'proceed',
          message: `Ready to install components and dependencies. Proceed?`,
          initial: true,
        });

        if (!proceed) {
          process.exit(0);
        }
      }

      const payload = await fetchComponents(selectedComponents);

      const spinner = ora(`Installing components...`).start();
      for (const item of payload) {
        spinner.text = `Installing ${item.name}...`;

        // NOTE: might want to use config to figure out the right targetDir.
        const targetDir = options.path
          ? path.resolve(cwd, options.path)
          : `${cwd}/components`;
        if (!targetDir) {
          continue;
        }

        if (!existsSync(targetDir)) {
          await fs.mkdir(targetDir, { recursive: true });
        }

        const existingComponent = existsSync(
          path.resolve(targetDir, item.name)
        );

        if (existingComponent && !options.overwrite) {
          if (selectedComponents.includes(item.name.slice(0, -4))) {
            spinner.stop();
            const { overwrite } = await prompts({
              type: 'confirm',
              name: 'overwrite',
              message: `Component ${item.name} already exists. Would you like to overwrite?`,
              initial: false,
            });

            if (!overwrite) {
              logger.info(
                `Skipped ${item.name}. To overwrite, run with the ${chalk.green(
                  '--overwrite'
                )} flag.`
              );
              continue;
            }

            spinner.start(`Installing ${item.name}...`);
          } else {
            continue;
          }
        }

        const filePath = path.resolve(targetDir, item.name);

        await fs.writeFile(filePath, item.content);
      }
      spinner.succeed(`Done.`);
    } catch (error) {
      handleError(error);
    }
  });
