import test, { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../../src/app.mjs';
import db from '../../src/db/connection.mjs';

describe('Funcionalidade: Autenticação de Usuário e Multi-tenant', () => {
  // Limpa o banco antes de cada teste
  test.beforeEach(() => {
    db.exec('DELETE FROM users');
    db.exec('DELETE FROM tenants');
  });

  describe('US-001 — Cadastro de Usuário Único e Criação de Tenant', () => {
    it('@spec:AC-001 Cadastro bem-sucedido cria o usuário e o tenant', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'João da Silva',
          email: 'joao@example.com',
          password: 'senhaforte',
          phone: '11999999999',
          companyName: 'Restaurante do João'
        });

      // O desafio é fazer a API retornar 201 Created
      assert.strictEqual(res.status, 201, 'API deve retornar 201 Created');
      
      const user = db.prepare('SELECT * FROM users WHERE email = ?').get('joao@example.com');
      assert.ok(user, 'Usuário deve ter sido salvo no banco');
      
      const tenant = db.prepare('SELECT * FROM tenants WHERE id = ?').get(user.tenant_id);
      assert.ok(tenant, 'Tenant deve ter sido criado');
      assert.strictEqual(tenant.name, 'Restaurante do João');
    });

    it('@spec:AC-002 E-mail duplicado é rejeitado', async () => {
      // Primeiro cadastro
      await request(app).post('/api/auth/register').send({
        name: 'Maria', email: 'maria@example.com', password: '123', companyName: 'M'
      });

      // Tentativa duplicada
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Maria Clone',
          email: 'maria@example.com',
          password: '123',
          companyName: 'M2'
        });

      assert.strictEqual(res.status, 409, 'API deve retornar 409 Conflict para e-mail duplicado');
    });
  });

  describe('US-002 — Login Seguro com Cookie HttpOnly', () => {
    // Preparação: Insere um usuário direto no banco antes dos testes de login
    test.beforeEach(() => {
      db.exec(`INSERT INTO tenants (id, name) VALUES ('t1', 'Empresa 1')`);
      // Nota: o aluno deverá usar bcrypt no cadastro, então aqui a senha no banco deve bater com a implementação dele.
      // Para o laboratório, enviaremos a senha e esperamos que a API valide.
      // (Para simplificar o esqueleto, não checamos a criptografia aqui, focamos no HTTP)
    });

    it('@spec:AC-003 Login válido gera sessão HttpOnly sem expor JWT no JSON', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'joao@example.com', password: 'senhaforte' });

      assert.strictEqual(res.status, 200, 'API deve retornar 200 OK');
      
      // O JWT não pode estar no corpo
      assert.strictEqual(res.body.token, undefined, 'CRÍTICO: O token não deve ser enviado no JSON da resposta');
      
      // O cookie HTTPOnly deve estar presente
      const cookies = res.headers['set-cookie'] || [];
      const tokenCookie = cookies.find(c => c.startsWith('token='));
      assert.ok(tokenCookie, 'O cookie "token" deve ser definido');
      assert.match(tokenCookie, /HttpOnly/, 'O cookie deve ser HttpOnly');
      assert.match(tokenCookie, /SameSite=Strict/, 'O cookie deve ter SameSite=Strict');
    });

    it('@spec:AC-004 Acesso negado com credenciais inválidas', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'inexistente@example.com', password: 'errada' });

      assert.strictEqual(res.status, 401, 'API deve retornar 401 Unauthorized');
      const cookies = res.headers['set-cookie'] || [];
      assert.strictEqual(cookies.length, 0, 'Nenhum cookie deve ser retornado se a senha estiver errada');
    });

    // Removido temporariamente AC-004.5 (Rate limit) para focar no fluxo principal do exercício
  });

  describe('US-003 — Proteção de Rotas (Multi-tenant)', () => {
    it('@spec:AC-005 Middleware injeta o Tenant ID a partir do Cookie', async () => {
      // O aluno precisará expor uma rota `/api/perfil` que retorne dados sensíveis
      const res = await request(app)
        .get('/api/perfil')
        .set('Cookie', ['token=TOKEN_SIMULADO']); // Aqui o teste injeta um cookie
      
      // Neste estágio inicial do laboratório, basta saber que a rota existe e tenta validar o token
      // Se não for um token válido, pode retornar 401. 
      // Se fosse um JWT válido, retornaria 200.
      // O objetivo aqui é o teste falhar no início (404) e passar depois.
      assert.notStrictEqual(res.status, 404, 'A rota /api/perfil deve existir');
    });

    it('@spec:AC-006 Requisição sem Cookie é bloqueada', async () => {
      const res = await request(app).get('/api/perfil');
      assert.strictEqual(res.status, 401, 'A API deve bloquear requisições anônimas na rota protegida');
    });
  });
});
