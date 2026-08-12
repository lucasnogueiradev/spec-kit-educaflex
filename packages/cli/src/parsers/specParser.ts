import * as fs from 'fs';

export interface ParsedSpec {
  title: string;
  acs: Array<{ id: string; title: string }>;
  rawContent: string;
}

export function parseSpec(filePath: string): ParsedSpec {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Basic parsing for the MVP
  const lines = content.split('\n');
  const acs: Array<{ id: string; title: string }> = [];
  let title = 'Feature';

  for (const line of lines) {
    if (line.startsWith('# Spec:')) {
      title = line.replace('# Spec:', '').trim();
    }
    const acMatch = line.match(/^####\s+(AC-\d+)\s+—\s+(.*)/);
    if (acMatch) {
      acs.push({ id: acMatch[1], title: acMatch[2].trim() });
    }
  }

  return { title, acs, rawContent: content };
}
