/// <reference path="types/process-env.d.ts" />

import { NextFunction } from 'express';
import 'dotenv/config';
import Redis from 'ioredis';

const {
  REDIS_HOST,
  REDIS_PORT: REDIS_PORT_STR,
  REDIS_PWD,
  REDIS_USER,
  REDIS_DB: REDIS_DB_STR,
} = process.env;

const REDIS_PORT = parseInt(REDIS_PORT_STR, 10);
const REDIS_DB = parseInt(REDIS_DB_STR, 10);

let redisClient: Redis;

export const getRedisClient = (): Redis => {
  if (redisClient) {
    return redisClient;
  }

  redisClient = new Redis({
    username: REDIS_USER,
    password: REDIS_PWD,
    db: REDIS_DB || undefined,
    port: REDIS_PORT || undefined,
    host: REDIS_HOST
  });

  redisClient.on('error', (err: Error) => {
    console.log('Error occurred during talking to redis:' + err);
  });

  redisClient.on('connect', () => {
    console.log('Connected to redis successfully');
  });

  return redisClient;
};

export const getSafelyDbResult = async <T>(
  method: (client: Redis) => Promise<T>,
  next: NextFunction
): Promise<T | undefined> => {
  try {
    return await method(getRedisClient());
  } catch (error) {
    next(error);
  }
};
