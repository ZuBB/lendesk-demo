import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import { isUsernameValid, isPasswordValid } from './app.validation';
import {
  createUser,
  isUserExists,
  isUserCredentialsValid,
  getAllowedContent
} from './app.service';
import { getSafelyDbResult } from './storage';


export const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const usernameCheckResult = isUsernameValid(username);
  const passwordCheckResult = isPasswordValid(password);

  if (!usernameCheckResult !== true) {
    return res.status(400).json({ errorMessage: usernameCheckResult });
  }

  if (!passwordCheckResult !== true) {
    return res.status(400).json({ errorMessage: passwordCheckResult });
  }

  if (await isUserExists(username, next)) {
    return res.status(409).json({ errorMessage: 'Username already taken' });
  }

  await createUser(username, password, next);
  res.status(201).json({ statusMessage: 'User has been created'});
};


export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!await isUserCredentialsValid(username, password, next)) {
    return res.status(401).json({ errorMessage: 'Invalid credentials' });
  }

  const token = uuidv4();
  const func = (client: Redis) => client.set(token, username, 'EX', 3600);
  await getSafelyDbResult(func, next);
  res.cookie('token', token).status(200).json(getAllowedContent(username));
};

export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['token'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await getSafelyDbResult((client: Redis) => client.del(token), next);
  res.json({ statusMessage: 'Logout successful' });
};

export const dataHandler = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['token'];
  const username = await getSafelyDbResult((client: Redis) => client.get(token), next);

  if (!token || !username) {
    return res.status(403).json({ errorMessage: 'Please login first' });
  }

  res.status(200).json(getAllowedContent(username));
};
