# Spec: Feature de Login

### US-001 — Login Simples
Como um usuário cadastrado,
quero fazer login no sistema usando email e senha,
para acessar minha conta.

#### AC-001 — Login com credenciais válidas
- **Dado** que o usuário digita email e senha corretos
- **Quando** clica em entrar
- **Então** ele é redirecionado para o dashboard e o token é salvo no cookie.

#### AC-002 — Login com credenciais inválidas
- **Dado** que o usuário digita uma senha errada
- **Quando** clica em entrar
- **Então** ele vê a mensagem "Credenciais inválidas" (HTTP 401).

## Suposições
- O backend usará JWT.

## Perguntas em aberto
- Vamos implementar limite de tentativas?
