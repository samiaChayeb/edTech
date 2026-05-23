import { createServer } from 'http';
import { app } from './main';

export default async (req, res) => {
  return app.getHttpServer()(req, res);
};
