import Redis from 'ioredis';
import { NextFunction } from 'express';
import { createHash } from 'node:crypto';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { getSafelyDbResult } from './storage';

export const isUserExists = async (username: string, next: NextFunction): Promise<boolean> => {
  const keysCount = await getSafelyDbResult(
    async (client: Redis) => await client.exists(username),
    next
  );

  return keysCount === 1;
};

export const createUser = async (
  username: string,
  password: string,
  next: NextFunction
): Promise<void> => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);

  await getSafelyDbResult(
    async (client: Redis) => await client.hset(username, 'password', hashedPassword),
    next
  );
};

export const isUserCredentialsValid = async (
  username: string,
  password: string,
  next: NextFunction
): Promise<boolean> => {
  if (!username || !password) return false;

  const storedPassword = await getSafelyDbResult(
    async (client: Redis) => await client.hget(username, 'password'),
    next
  );

  return !!storedPassword && compareSync(password, storedPassword);
};

export const getAllowedContent = (username: string) => {
  const hash = createHash('sha256');
  hash.update(new Date().toISOString());
  const sha256 = hash.copy().digest('hex').substring(0, 8);
  return { username, sha256 };
};