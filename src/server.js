import express from 'express';
import pinoHttp from 'pino-http';
import dotenv from "dotenv";
import { getEnvVar } from './utils/getEnvVar.js';

dotenv.config();

const app = express();

const PORT = Number(getEnvVar('PORT', '3000'));

const logger = pinoHttp({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});

app.use(express.json());
app.use(logger);


app.get('/', (req, res) => {
  res.json({ message: 'Сервер працює' });
});

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
  });
};