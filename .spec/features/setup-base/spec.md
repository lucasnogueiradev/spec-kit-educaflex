# Spec: Setup Base da API (Demonstração)

> feature: setup-base
> status: concluida

## Contexto
Esta feature contém o laboratório base do projeto (servidor Express, conexão SQLite e rota de estudantes para demonstração). 

## Histórias

### US-000 — Laboratório Base
Como aluno, quero uma API pré-configurada rodando, para não perder tempo com infraestrutura.

#### AC-000 — API Base responde
- **Dado** que a aplicação subiu
- **Quando** bater em `/api/health`
- **Então** retorna status ok.

## Suposições
Nenhuma.

## Perguntas em aberto
Nenhuma.
