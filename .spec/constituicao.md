# Regras do Projeto (v1.0.0)

<!--
  Princípios Gerais do Projeto.
  Aqui você e seu professor podem adicionar regras de qualidade ou segurança que valem para todo o código.
-->

## P-001 [DEVE] Toda funcionalidade tem prova de funcionamento

Nenhuma funcionalidade é considerada pronta sem testes provando que ela realmente funciona.

- verificação(gate): intrínseca ao audit

## P-002 [RECOMENDADO] Segredos e senhas fora do código

Chaves de API, senhas e senhas de banco vêm de variáveis de ambiente e nunca ficam gravadas no código.

- verificação(proibido): `(api[_-]?key|senha|password)\s*[:=]\s*['"][^'"]{8,}` em `src/**/*.js`
