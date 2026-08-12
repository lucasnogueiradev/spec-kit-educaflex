import { test, describe } from 'node:test';
import assert from 'node:assert';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliPath = path.join(__dirname, '..', '.agents', 'skills', 'onp-spec-driven', 'scripts', 'onp-spec.mjs');

function runCli(cwd, args) {
  try {
    const output = execSync(`node ${cliPath} ${args.join(' ')}`, { cwd, encoding: 'utf-8', stdio: 'pipe' });
    return { status: 0, output };
  } catch (err) {
    return { status: err.status, output: err.stdout || err.stderr };
  }
}

describe('Motor onp-spec CLI', () => {

  test('Deve rodar audit limpo em projeto sem features', () => {
    const cwd = path.join(__dirname, 'fixtures', 'clean');
    const result = runCli(cwd, ['audit']);
    assert.strictEqual(result.status, 0, 'Audit deve retornar 0 em projeto limpo. Saída: ' + result.output);
  });

  test('Deve passar a auditoria em projeto válido', () => {
    const cwd = path.join(__dirname, 'fixtures', 'valid');
    const result = runCli(cwd, ['audit']);
    assert.strictEqual(result.status, 0, 'Audit deve retornar 0 em projeto válido. Saída: ' + result.output);
  });

  test('Deve falhar a auditoria em projeto inválido', () => {
    const cwd = path.join(__dirname, 'fixtures', 'invalid');
    const result = runCli(cwd, ['audit']);
    assert.notStrictEqual(result.status, 0, 'Audit deve retornar != 0 em projeto inválido');
    assert.match(result.output, /AC_SEM_TESTE/, 'Deve acusar falta de teste');
  });

});
