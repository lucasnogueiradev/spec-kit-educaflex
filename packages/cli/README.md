# Educaflex CLI (MVP)

> 🚧 **Aviso:** Protótipo experimental — a etapa de implementação automática ainda não está funcional. Não use em produção nem no fluxo recomendado do curso.

Diferente de templates passivos, esta CLI atua como um juiz mecânico: ela lê o seu planejamento, converte em tarefas, gera os esqueletos de testes, invoca o Agente de IA para a implementação e **audita mecanicamente** se a IA cumpriu com o prometido.

## 🚀 Como funciona o Pipeline (`educaflex run`)

Ao rodar o comando único, a CLI executa 6 passos de forma autônoma:

1. **Parse da Especificação**: Lê o arquivo `spec.md` e extrai os Critérios de Aceitação (ACs).
2. **Geração de Tarefas**: Cria o `tasks.md` formatado.
3. **Scaffold de Testes**: Gera os testes em `*.spec.ts` com as tags `@spec:AC-xxx` prontas, utilizando `vitest`.
4. **Rodar Testes**: Executa o `vitest` em background e extrai o relatório estruturado (JSON).
5. **Auditoria de Intenção**: Cruza os testes aprovados pelo `vitest` com a lista de Critérios de Aceitação da spec original. Se um critério faltar ou falhar, a pipeline quebra, devolvendo o controle para que você ou sua IA implementem o código.

## 🛠️ Como testar

Entre na pasta do pacote e execute o exemplo funcional embutido:

```bash
cd packages/cli
npm install
npm run start -- run --feature example/features/login/spec.md
```

### Saída Esperada

Você verá o fluxo acontecendo e o relatório final da auditoria atestando que todos os critérios de aceite passaram.

```text
=== Relatório de Auditoria ===
❌ [AC_FALHOU] Teste para AC-001 falhou.
❌ [AC_FALHOU] Teste para AC-002 falhou.
==============================

💥 Auditoria FALHOU! O código não cumpre 100% da especificação.

👉 Dica: Leia o log acima, implemente o código que falta e rode 'educaflex run' novamente.
```
