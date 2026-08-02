import express, { urlencoded } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { userRouter } from './routes/user/userRouter';
import { goalsRouter } from './routes/goals/goalsRouter';
import helmet from 'helmet';

const server = express();
server.use(helmet());
server.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
server.use(urlencoded({ extended: true }));
server.disable('x-powered-by');
server.use(express.json());

server.use(userRouter)
server.use(goalsRouter)

const port = process.env.API_PORT;
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})