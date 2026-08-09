import { Command } from 'commander';
import { runCommand } from './commands/run';
import chalk from 'chalk';

const program = new Command();

program
  .name('educaflex')
  .description('CLI do Educaflex para Spec-Driven Development')
  .version('1.0.0');

program.addCommand(runCommand);

program.parseAsync(process.argv).catch((err) => {
  console.error(chalk.red('Erro inesperado:'), err);
  process.exit(1);
});
