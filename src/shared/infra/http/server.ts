import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import swagger from 'swagger-ui-express';
import swaggerFile from 'swagger.json';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';
import rateLimiter from './middlewares/rateLimiter';

const app = express();
app.use(cors());

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(rateLimiter);

app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile));

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  console.log(`Open API Docs: http://localhost:${port}/api-docs`);
});
