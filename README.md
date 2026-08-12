# Spec-Kit Educaflex 🚀

[![NPM Version](https://img.shields.io/npm/v/spec-kit-educaflex.svg)](https://www.npmjs.com/package/spec-kit-educaflex)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Educaflex](https://img.shields.io/badge/Educaflex-Course-blue.svg)](http://curso.lucasnogueiradev.com.br)

O **Spec-Kit Educaflex** é um **Simulador de Voo para Desenvolvedores e IAs**. Ele é um laboratório interativo projetado para ensinar *Spec-Driven Development (SDD)* na prática.

### ❓ O que é?
O problema de programar com IA hoje é o "vibe coding": o desenvolvedor vai pedindo código no chute, sem arquitetura, e logo o projeto desmorona. Este kit é um ambiente de treinamento opinativo (com um backend Node.js + Express já embutido) que ensina você a forçar a IA a seguir regras estritas de arquitetura e segurança.

### 🎯 Para que serve?
- **Laboratório Interativo:** Você baixa o repositório, roda o motor de testes e vê a aplicação falhar (propositalmente). Seu objetivo é guiar a IA para consertar.
- **Guiar Agentes de IA sem Alucinações:** Aprenda a comandar IAs (Antigravity, Claude Code, Cursor) usando especificações rigorosas.
- **Boas Práticas Embutidas:** O desafio já cobra padrões como Cookies `HttpOnly`, Multi-tenant e Proteção de Rotas.

### ⚡ Na Prática
Em vez de começar escrevendo código às cegas, o fluxo segue 4 passos simples no seu treinamento:
1. **Especificar (`spec.md`):** Você e a IA definem a história do usuário e os critérios *"Como eu sei que funcionou"*.
2. **Gerar Tarefas e Testes (`tasks.md`):** O kit cria os testes-esqueleto e a lista de execução.
3. **Codificar com Segurança:** A IA ou você implementam o código com base nas regras do projeto.
4. **Auditar:** O motor verifica mecanicamente se 100% dos critérios foram testados e aprovados.

Você precisa de ferramentas que **ditem o ritmo** e estruturem o raciocínio para você não se perder.

## ⚖️ Qual ferramenta usar?

Este repositório contém duas ferramentas. Para não haver confusão, siga a recomendação abaixo:

- ✅ **Motor Embarcado (`onp-spec`):** **(Recomendado)** É a ferramenta principal e canônica. Ela atua como um juiz passivo e rigoroso, orientando a IA através de comandos CLI leves (`onp-spec audit`, `onp-spec plano`). É a base do curso.
- 🚧 **Educaflex CLI (`packages/cli`):** **(Experimental)** É um protótipo isolado que tenta automatizar todo o fluxo em um comando só (`educaflex run`). Ele não escreve código por você (você ainda depende de uma IA externa), e o formato de uso **não** é o fluxo recomendado para produção ou aprendizado primário. Use por sua conta e risco. (Veja a [documentação do protótipo](packages/cli/README.md)).

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

> 🚧 **AVISO:** Existe um protótipo de automação em `packages/cli` (a **Educaflex CLI**), mas ela é estritamente experimental. O fluxo recomendado do curso e o motor oficial do projeto continuam sendo a skill embarcada em `onp-spec` (detalhes na seção abaixo).

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

## 🎓 O Laboratório Prático: O Desafio de Autenticação

Este repositório já é o seu ambiente de treinamento. Nós deixamos a base de uma API Express + SQLite pronta (`src/server.mjs`), mas a funcionalidade de `autenticacao-usuario` está **propositalmente faltando**.

Se você rodar `npm run audit` agora no projeto recém-clonado, o motor vai testar a API e **falhar** com 6 erros. Isso é o comportamento esperado: o sistema está cobrando de você a implementação.

**Como resolver o exercício:**
1. Leia a especificação pronta em `.spec/features/autenticacao-usuario/spec.md`.
2. Peça para o seu Agente de IA (Antigravity, Cursor, etc) ou escreva você mesmo o código em Node/Express (ex: `src/routes/auth.mjs`) seguindo estritamente as `tasks.md` até que os testes comecem a passar.
3. Rode `npm run audit` iterativamente. Quando a saída for verde com zero erros, parabéns: você concluiu o exercício com prova mecânica de qualidade!

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

---

## 👨‍💻 Sobre o Autor

**Lucas Nogueira**  
Desenvolvedor de Software e criador do Spec-Kit Educaflex. Especialista em Spec-Driven Development, Arquitetura de Software e Agentes de IA, focado em criar ferramentas que unem planejamento, automação e código robusto.

- 🎓 **Curso:** [curso.lucasnogueiradev.com.br](http://curso.lucasnogueiradev.com.br)
- 💼 **LinkedIn:** [Lucas Souza Nogueira](https://www.linkedin.com/in/lucas-souza-nogueira-605ba022a/)
- 🐙 **GitHub:** [lucasnogueiradev](https://github.com/lucasnogueiradev)
