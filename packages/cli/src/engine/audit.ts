import * as fs from 'fs';
import chalk from 'chalk';
import { ParsedSpec } from '../parsers/specParser';

export function runAudit(spec: ParsedSpec, vitestOutputJsonPath: string): boolean {
  if (!fs.existsSync(vitestOutputJsonPath)) {
    console.error(chalk.red(`[Auditoria] Falha: Relatório de testes não encontrado.`));
    return false;
  }

  const raw = fs.readFileSync(vitestOutputJsonPath, 'utf-8');
  const data = JSON.parse(raw);
  
  const testResults = data.testResults || [];
  const allTests = testResults.flatMap((suite: any) => suite.assertionResults || []);

  let hasError = false;

  console.log(chalk.blue(`\n=== Relatório de Auditoria ===`));

  for (const ac of spec.acs) {
    const matchingTest = allTests.find((t: any) => t.title.includes(`@spec:${ac.id}`));
    
    if (!matchingTest) {
      console.log(chalk.red(`❌ [AC_SEM_TESTE] Critério ${ac.id} não possui testes automatizados.`));
      hasError = true;
    } else if (matchingTest.status !== 'passed') {
      console.log(chalk.red(`❌ [AC_FALHOU] Teste para ${ac.id} falhou.`));
      hasError = true;
    } else {
      console.log(chalk.green(`✅ [AC_APROVADO] ${ac.id}: ${ac.title}`));
    }
  }

  console.log(chalk.blue(`==============================\n`));

  return !hasError;
}
