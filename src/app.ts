import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { registerHandler, loginHandler, logoutHandler } from './app.route-handlers';
import { getRedisClient } from './app.storage';

const { APP_PORT: port } = process.env;
const app: Application = express();

let redisStore = new RedisStore({
  client: getRedisClient(),
  prefix: "lendesk-demo-app:",
})

// app.use(helmet());
// app.use(cors());
app.use(express.json());

app.use(
  session({
    name: process.env.SESS_NAME,
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: "keyboard cat", // TODO
  })
);

app.post('/register', registerHandler);
app.post('/login', loginHandler);
app.post('/logout',  logoutHandler);


app.listen(port, function () {
  console.log(`App is listening on port ${port}!`);
});