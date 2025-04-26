import express from 'express';
import pinoHttp from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContactsController, createContactController, getContactByIdController } from './controllers/contacts.js';


dotenv.config();

export const setupServer = () => {
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

  app.use(cors());
  app.use(express.json());
  app.use(logger);

  app.get('/', (req, res) => {
    res.json({ message: 'Сервер працює' });
  });

  app.get('/contacts', getAllContactsController);
  app.post('/contacts', createContactController);
  app.get('/contacts/:contactId', getContactByIdController);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
