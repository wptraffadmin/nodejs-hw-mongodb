import express from 'express';
import pinoHttp from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

dotenv.config();

export const setupServer = () => {
  const app = express();

  const PORT = Number(getEnvVar('PORT', '3000'));

  const logger = pinoHttp({
    transport: {
      target: 'pino-pretty',
      options: { colorize: true }
    }
  });

  app.use(cors());
  app.use(express.json());
  app.use(logger);
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({ message: 'Сервер працює' });
  });

  app.use('/uploads', express.static(UPLOAD_DIR));
  
  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
