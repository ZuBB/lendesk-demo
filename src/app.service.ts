import Redis from 'ioredis';
import { NextFunction } from 'express';
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
}