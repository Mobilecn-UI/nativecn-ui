// Heavily based on https://github.com/shadcn-ui/ui/blob/main/packages/cli/src/commands/init.ts
import chalk from 'chalk';
import { Command } from 'commander';
import { execa } from 'execa';
import { existsSync, promises as fs } from 'fs';
import ora from 'ora';
import path from 'path';
import * as z from 'zod';

import { getPackageManager } from '@/src/utils/get-package-manager';
import { handleError } from '@/src/utils/handle-error';
import { logger } from '@/src/utils/logger';
import * as templates from '@/src/utils/templates';

const DEPENDENCIES = [
  'class-variance-authority',
  'clsx',
  'nativewind',
  'tailwind-merge',
];
const DEV_DEPENDENCIES = ['tailwindcss'];

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
});

export const init = new Command()
  .name('init')
  .description('initialize your project and install dependencies')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd()
  )
  .action(async opts => {
    try {
      const options = initOptionsSchema.parse(opts);
      const cwd = path.resolve(options.cwd);

      await runInit(cwd);

      logger.info(
        `${chalk.green('Success!')} Project initialization completed.`
      );
    } catch (error) {
      handleError(error);
    }
  });

export async function runInit(cwd: string) {
  const spinner = ora(`Initializing project...`)?.start();

  // Write tailwind config.
  await fs.writeFile(
    `${cwd}/tailwind.config.js`,
    templates.TAILWIND_CONFIG,
    'utf8'
  );

  // Write babel config.
  await fs.writeFile(`${cwd}/babel.config.js`, templates.BABEL_CONFIG, 'utf8');

  // Write lib/utils.ts.
  if (existsSync(`${cwd}/lib/utils.ts`)) {
    await fs.writeFile(`${cwd}/lib/utils.ts`, templates.UTILS, 'utf8');
  }

  spinner.succeed();

  // Install dependencies.
  const dependenciesSpinner = ora(`Installing dependencies...`)?.start();
  const packageManager = await getPackageManager(cwd);
  const packageCommand = packageManager === 'npm' ? 'install' : 'add';

  await execa(packageManager, [packageCommand, ...DEPENDENCIES], { cwd });
  await execa(
    packageManager,
    [
      packageCommand,
      ...DEV_DEPENDENCIES,
      packageManager === 'npm' ? '--save-dev' : '--dev',
    ],
    { cwd }
  );

  dependenciesSpinner?.succeed();
}
