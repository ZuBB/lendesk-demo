import express from 'express';
import 'dotenv/config';
import { join } from 'path';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { dataHandler, registerHandler, loginHandler, logoutHandler } from './app.route-handlers';
import { getRedisClient } from './storage';

const { APP_PORT: port } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(join(process.cwd(), 'public')));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "jsdelivr.net", "lendesk.com"],
      },
    },
  })
);

app.post('/register', registerHandler);
app.post('/login', loginHandler);
app.post('/logout', logoutHandler);
app.get('/protected', dataHandler);

process.on('exit', async () => await getRedisClient().quit());

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
