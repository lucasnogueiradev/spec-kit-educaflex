import express from 'express';
import db from '../db/connection.mjs';

const router = express.Router();

// O aluno não precisa fazer essa rota, ela já funciona como exemplo!
router.get('/', (req, res) => {
  // Apenas uma listagem boba de demonstração
  const stmt = db.prepare('SELECT id, name, email, role FROM users');
  const users = stmt.all();
  res.json({ users });
});

export default router;
