import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Usamos um arquivo SQLite para que o aluno possa inspecionar os dados
const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Setup das tabelas (se não existirem)
db.exec(`
  CREATE TABLE IF NOT EXISTS tenants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student',
    FOREIGN KEY(tenant_id) REFERENCES tenants(id)
  );

  -- Dados semente (Seed)
  INSERT OR IGNORE INTO tenants (id, name) VALUES ('tenant-demo-1', 'Escola de Magia Educaflex');
  -- Inserimos um professor inicial
  INSERT OR IGNORE INTO users (id, tenant_id, name, email, password_hash, role) 
  VALUES ('u-1', 'tenant-demo-1', 'Alvo Dumbledore', 'alvo@educaflex.com', 'hashencriptada', 'teacher');
`);

export default db;
