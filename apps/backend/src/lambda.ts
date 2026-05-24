import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import serverless from 'serverless-http';
import { AppModule } from './app.module';

const expressApp = express();

async function bootstrap() {
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter, { logger: ['error', 'warn', 'log'] });

  // replicate same setup as in main.ts
  const configService = app.get('ConfigService');
  try {
    app.use(require('helmet')());
  } catch (e) {}
  app.use(require('cookie-parser')());
  // CORS: allow from env or localhost
  const origins = (configService && configService.get('CORS_ORIGINS')) || 'http://localhost:3000';
  try {
    app.enableCors({ origin: origins.split(','), credentials: true });
  } catch (e) {}

  await app.init();
  return expressApp;
}

const handlerPromise = bootstrap().then(() => serverless(expressApp));

export const handler = async (event: any, context: any) => {
  const hf = await handlerPromise;
  return hf(event, context);
};
