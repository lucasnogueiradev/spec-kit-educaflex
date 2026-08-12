import app from './app.mjs';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Simulador Educaflex rodando na porta ${PORT}`);
  console.log(`Para testar: http://localhost:${PORT}/api/health`);
});
