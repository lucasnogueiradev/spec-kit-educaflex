import * as fs from 'fs';
import * as path from 'path';
import { ParsedSpec } from '../parsers/specParser';

export function generateTasks(spec: ParsedSpec, outDir: string): void {
  let content = `# Tarefas Geradas Automaticamente\n\n`;
  content += `> Feature: ${spec.title}\n\n`;

  spec.acs.forEach((ac, index) => {
    content += `## T-${String(index + 1).padStart(3, '0')} Implementar ${ac.title} [pendente]\n`;
    content += `- Refs: ${ac.id}\n`;
    content += `- Notas: Implementação gerada a partir da spec.\n\n`;
  });

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outDir, 'tasks.md'), content);
}
