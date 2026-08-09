import { Command } from 'commander';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';
import chalk from 'chalk';

import { parseSpec } from '../parsers/specParser';
import { generateTasks } from '../generators/taskGenerator';
import { generateTests } from '../generators/testGenerator';
import { simulateAIImplementation } from '../agent/simulator';
import { runAudit } from '../engine/audit';

export const runCommand = new Command('run')
  .description('Executa o ciclo completo de Spec-Driven Development')
  .requiredOption('--feature <path>', 'Caminho para o arquivo spec.md')
  .action((options) => {
    const specPath = path.resolve(process.cwd(), options.feature);
    const featureDir = path.dirname(specPath);
    const testsDir = path.join(featureDir, 'tests');

    console.log(chalk.cyan(`\n🚀 Iniciando ciclo SDD para: ${specPath}\n`));

    // Passo 1: Parse
    console.log(chalk.yellow(`[1/6] Lendo e validando a especificação...`));
    if (!fs.existsSync(specPath)) {
      console.error(chalk.red(`Arquivo não encontrado: ${specPath}`));
      process.exit(1);
    }
    const spec = parseSpec(specPath);
    console.log(chalk.gray(`      -> Feature: ${spec.title} | ${spec.acs.length} ACs encontrados.`));

    // Passo 2: Tasks
    console.log(chalk.yellow(`[2/6] Gerando tasks.md...`));
    generateTasks(spec, featureDir);

    // Passo 3: Tests
    console.log(chalk.yellow(`[3/6] Gerando scaffold de testes...`));
    generateTests(spec, testsDir);

    // Passo 4: Agent
    console.log(chalk.yellow(`[4/6] Acionando IA para implementação...`));
    simulateAIImplementation(spec, testsDir);

    // Passo 5: Run Tests
    console.log(chalk.yellow(`[5/6] Executando testes automatizados...`));
    const vitestOut = path.join(featureDir, 'vitest-output.json');
    try {
      // Using npx vitest directly. We ensure it outputs JSON.
      execSync(`npx vitest run --dir ${testsDir} --reporter=json --outputFile=${vitestOut}`, {
        stdio: 'ignore'
      });
    } catch (e) {
      // Vitest exits with 1 if tests fail, which is expected here for negative cases.
    }

    // Passo 6: Audit
    console.log(chalk.yellow(`[6/6] Rodando auditoria final...`));
    const passed = runAudit(spec, vitestOut);

    if (passed) {
      console.log(chalk.green(`\n🎉 Auditoria concluída com SUCESSO! A feature está garantida pelas especificações.`));
      process.exit(0);
    } else {
      console.error(chalk.red(`\n💥 Auditoria FALHOU! O código não cumpre 100% da especificação.`));
      process.exit(1);
    }
  });
