import 'dotenv/config';
import Redis from 'ioredis';

const { REDIS_HOST, REDIS_PORT } = process.env;

let redisClient: Redis;

export const getRedisClient = (): Redis => {
  if (redisClient) {
    return redisClient;
  }

  redisClient = new Redis(
    // TODO
    REDIS_PORT as unknown as number,
    REDIS_HOST as string
  );

  redisClient.on('error', (err) => {
    console.log('Error occured during talking to redis:' + err);
  });

  redisClient.on('connect', () => {
    console.log('Connected to redis successfully');
  });

  return redisClient;
}