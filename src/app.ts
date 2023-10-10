import 'dotenv/config';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/toto', (_req: Request, res: Response) => {
  res.send('Hello toto');
})

const { PORT:port } = process.env;

app.listen(port, function () {
  console.log(`App is listening on port ${port}!`);
});