import express from 'express';
import cookieParser from 'cookie-parser';
import studentsRouter from './routes/students.mjs';
// import authRouter from './routes/auth.mjs'; // <--- O aluno vai precisar criar isso!

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/students', studentsRouter);

// Rota de Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Simulador Educaflex operante!' });
});

export default app;
