#!/usr/bin/env node
import { Command } from 'commander';

import { add } from './commands/add';
import { init } from './commands/init';

function main() {
  const program = new Command();

  program
    .name('nativecn-ui')
    .description('add components and dependencies to your expo project')
    .version('0.0.6');

  program.addCommand(init).addCommand(add);

  program.parse();
}

main();
