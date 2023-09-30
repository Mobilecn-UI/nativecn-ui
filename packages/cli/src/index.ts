#!/usr/bin/env node
import { Command } from 'commander';

import { add } from './commands/add';

function main() {
  const program = new Command();

  program
    .name('nativecn-ui')
    .description('add components to your expo project')
    .version('0.0.1');

  program.addCommand(add);

  program.parse();
}

main();
