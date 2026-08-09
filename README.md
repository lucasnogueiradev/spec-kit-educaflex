# Spec-Kit Educaflex 🚀

O **Spec-Kit Educaflex** é uma estrutura de desenvolvimento guiada por especificações (**Spec-Driven Development — SDD**) totalmente integrada com Agentes de IA autônomos.

### ❓ O que é?
É um toolkit e metodologia que conecta o planejamento de software diretamente à execução do código e à validação automatizada. Ele garante que nenhuma funcionalidade seja considerada "pronta" sem testes provando que ela realmente funciona.

### 🎯 Para que serve?
- **Guiar Agentes de IA sem Alucinações:** Orienta IAs (Antigravity, Claude Code, Cursor, Codex) a seguirem regras rígidas de arquitetura e segurança.
- **Garantir Boas Práticas por Padrão:** Aplica padrões avançados de segurança (como Cookies `HttpOnly`, Rate Limiting, RBAC e isolamento multi-tenant).
- **Linguagem Clara e Amigável:** Traduz jargões técnicos para conceitos simples em português, facilitando a leitura e auditoria.

### ⚡ Na Prática
Em vez de começar escrevendo código às cegas, o fluxo segue 4 passos simples:
1. **Especificar (`spec.md`):** Você e a IA definem a história do usuário e os critérios *"Como eu sei que funcionou"*.
2. **Gerar Tarefas e Testes (`tasks.md`):** O kit cria os testes-esqueleto e a lista de execução.
3. **Codificar com Segurança:** A IA ou você implementam o código com base nas regras do projeto.
4. **Auditar:** O motor verifica mecanicamente se 100% dos critérios foram testados e aprovados.

---

## 📦 Como Baixar e Usar

Existem duas formas simples de usar no seu projeto:

### Opção 1: Adicionar ao seu Projeto do Zero (Shadcn UI + PNPM) — Recomendado

Se você criou o seu projeto do zero usando **pnpm**, **Vite / Next.js** e **Shadcn UI**, execute o comando correspondente à sua IA / Editor dentro da pasta do projeto:

```bash
# Para Antigravity (Gemini IDE):
pnpm dlx spec-kit-educaflex@github:lucasnogueiradev/spec-kit-educaflex init --agents antigravity

# Para Claude Code:
pnpm dlx spec-kit-educaflex@github:lucasnogueiradev/spec-kit-educaflex init --agents claude

# Para Codex:
pnpm dlx spec-kit-educaflex@github:lucasnogueiradev/spec-kit-educaflex init --agents codex

# Para Cursor IDE:
pnpm dlx spec-kit-educaflex@github:lucasnogueiradev/spec-kit-educaflex init --agents cursor
```

---

### Opção 2: Clonando este Kit Completo via NPX

Se você quiser baixar o template pronto com a estrutura de especificações:

```bash
npx degit lucasnogueiradev/spec-kit-educaflex meu-projeto-educaflex
cd meu-projeto-educaflex
pnpm install
```

---

## 🧠 Como Funciona o Kit

O kit segue o ciclo de desenvolvimento **Spec-Anchored**: a especificação é mantida verdadeira porque é auditada mecanicamente contra o código.

> 🚀 **NOVIDADE:** Agora temos um MVP completo da **Educaflex CLI** em TypeScript que automatiza todo esse ciclo em um único comando (`educaflex run`)! Ele gera as tasks, faz o scaffold dos testes e roda a auditoria para garantir que a IA provou as intenções. Leia mais na [Documentação da CLI](packages/cli/README.md).

```text
┌───────────┐    ┌────────┐    ┌───────┐    ┌────────┐    ┌───────┐
│ESPECIFICAR│ ➔  │PROJETAR│ ➔  │TAREFAS│ ➔  │EXECUTAR│ ➔  │AUDITAR│
└───────────┘    └────────┘    └───────┘    └────────┘    └───────┘
```

1. **Especificar:** Você define o que precisa ser feito e os critérios de aceite ("Como eu sei que funcionou").
2. **Projetar:** A funcionalidade é quebrada em tarefas menores e gerenciáveis.
3. **Executar:** O código e os testes são implementados (com auxílio da IA).
4. **Auditar:** O motor verifica mecanicamente se todos os critérios definidos foram testados e aprovados.

---

## 🎯 Vocabulário Amigável e Acessível

Nosso kit traduz jargões técnicos para conceitos fáceis de entender:

| Termo Técnico | Termo Educaflex (Português Simples)     | O que significa na prática                                       |
| ------------- | --------------------------------------- | ---------------------------------------------------------------- |
| **US-xxx**    | **História do Usuário**                 | Quem precisa da função, o que quer fazer e por quê.              |
| **AC-xxx**    | **Como eu sei que funcionou**           | O resultado exato que a tela/código deve mostrar para dar certo. |
| **ASM-xxx**   | **O que estou assumindo sem confirmar** | Um palpite ou regra de negócio pendente de confirmação.          |
| **Q-xxx**     | **Pergunta em Aberto**                  | Uma dúvida pendente antes de programar.                          |
| **T-xxx**     | **Tarefa de Desenvolvimento**           | Um passo prático de código a ser feito.                          |
| **DoD**       | **Prova de Funcionamento Automática**   | Todos os testes passando com sucesso.                            |

---

## 🛠️ Guia de Uso Passo a Passo

### 1. Inicializar a Estrutura do Projeto

Cria a pasta `.spec/` com as regras e constituição inicial do projeto:

```bash
npm run init
```

_Isso gera o arquivo `.spec/constituicao.md` com as regras essenciais de testes e segurança._

---

### 2. Criar uma Nova Funcionalidade

Para iniciar a especificação de um novo módulo (ex: `autenticacao-usuario` para Cadastro, Login e Token Único):

```bash
npm run spec -- new autenticacao-usuario
```

Isso gera automaticamente:

- `.spec/features/autenticacao-usuario/spec.md`: Onde você descreve a **História do Usuário** e os critérios **"Como eu sei que funcionou"** (ex: cadastro, login e armazenamento seguro de Token via Cookie `HttpOnly`, sem expor no `localStorage`).
- `.spec/features/autenticacao-usuario/tasks.md`: Onde a funcionalidade é dividida em tarefas práticas.

> **💡 Dica de Segurança:** A skill [`backend-security-coder`](.agents/skills/backend-security-coder/SKILL.md) orienta a IA a implementar a gravação de tokens em **Cookies `HttpOnly` + `SameSite`** (em vez de `localStorage`), prevenindo ataques de XSS e vazamento de sessão.

---

### 3. Criar os Testes-Esqueleto Automáticos

```bash
npm run spec -- scaffold autenticacao-usuario
```

Gera a suíte de testes inicial que falha propositalmente até que o código seja implementado de verdade.

---

### 4. Programar e Auditar se Deu Certo

Ao terminar de escrever o código, você roda:

```bash
npm run audit
```

O `audit` checa se cada critério **"Como eu sei que funcionou"** possui testes passando e traz sugestões em português simples caso falte algo.

## 🎓 Exercício Prático: O Desafio de Autenticação

Para você entender a dinâmica na prática, o kit **já vem com uma funcionalidade de exemplo** pronta para ser desenvolvida: a \`autenticacao-usuario\`.

Se você rodar \`npm run audit\` agora no projeto recém-clonado, o motor vai propositalmente **falhar** avisando que faltam testes (\`AC_SEM_TESTE\`) e que os arquivos de código não existem (\`ARQUIVO_INEXISTENTE\`). Isso é o comportamento esperado do framework protegendo o seu projeto de features não implementadas!

**Como resolver o exercício:**
1. Leia a especificação e as tarefas prontas dentro da pasta \`.spec/features/autenticacao-usuario/\`.
2. Peça para o motor gerar os testes-esqueleto rodando:
   \`\`\`bash
   npm run spec -- scaffold autenticacao-usuario
   \`\`\`
3. Peça para o seu Agente de IA (Antigravity, Cursor, etc) ou escreva você mesmo o código seguindo as instruções das \`tasks.md\` até que os testes passem.
4. Rode \`npm run audit\` novamente. Quando a saída for verde com zero erros, parabéns: você concluiu o exercício com prova mecânica de qualidade!

---

## 🌿 Workflow Recomendado de Git (Trabalhando Solo)

Mesmo desenvolvendo em um projeto solo, o fluxo recomendado segue boas práticas profissionais usando **Branches por Feature**:

```bash
# 1. Criar e entrar na branch da nova funcionalidade
git checkout -b feature/autenticacao-usuario

# 2. Criar a especificação e tarefas
npm run spec -- new autenticacao-usuario

# 3. Gerar os testes e implementar o código (com ajuda da skill backend-security-coder)
npm run spec -- scaffold autenticacao-usuario

# 4. Auditar para garantir que tudo passou
npm run audit

# 5. Salvar o progresso na branch
git add .
git commit -m "feat(autenticacao-usuario): login e token httpOnly implementado e auditado"

# 6. Unir (merge) na branch principal (main) após o audit aprovar
git checkout main
git merge feature/autenticacao-usuario
git push origin main
```

> **Por que isso é importante?** Garante que a branch principal (`main`) só receba código limpo, funcional e provado por testes. Se algo der errado na funcionalidade, a `main` continua segura.

---

## 🤖 Uso com Agentes de IA (Antigravity, Claude Code, Codex e Cursor)

O kit é 100% compatível com as principais IAs de código do mercado (**Antigravity**, **Claude Code**, **Codex** e **Cursor**):

- A IA lê automaticamente as regras contidas em `.agents/skills/`.
- A IA ajuda a preencher a especificação (`spec.md`), criar o código e rodar os testes.
- Se você perguntar _"Como implementar essa feature?"_, qualquer um desses agentes guiará o desenvolvimento pelo ciclo Spec-Driven sem pular etapas nem deixar de fazer os testes.
