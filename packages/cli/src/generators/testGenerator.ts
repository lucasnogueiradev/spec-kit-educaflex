import * as fs from 'fs';
import * as path from 'path';
import { ParsedSpec } from '../parsers/specParser';

export function generateTests(spec: ParsedSpec, outDir: string): void {
  let content = `import { describe, it, expect } from 'vitest';\n\n`;
  content += `describe('Feature: ${spec.title}', () => {\n`;

  spec.acs.forEach((ac) => {
    content += `  it('${ac.title} // @spec:${ac.id}', () => {\n`;
    content += `    // TODO: Teste gerado automaticamente, requer implementação\n`;
    // For the MVP simulator to pass, we will assert true here, 
    // but the simulator will modify it or the implementation will satisfy it.
    // Actually, to make it fail initially, we could do expect(false).toBe(true).
    // But the simulator is supposed to "implement" the feature. We'll make it fail by default.
    content += `    expect(true).toBe(false);\n`;
    content += `  });\n\n`;
  });

  content += `});\n`;

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outDir, 'feature.spec.ts'), content);
}
