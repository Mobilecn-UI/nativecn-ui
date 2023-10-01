// Stolen from https://github.com/shadcn-ui/ui/blob/main/packages/cli/src/utils/logger.ts
import chalk from 'chalk';

export const logger = {
  error(...args: unknown[]) {
    console.log(chalk.red(...args));
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellow(...args));
  },
  info(...args: unknown[]) {
    console.log(chalk.cyan(...args));
  },
  success(...args: unknown[]) {
    console.log(chalk.green(...args));
  },
  break() {
    console.log('');
  },
};
