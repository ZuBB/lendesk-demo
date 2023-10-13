export interface LendeskProcessEnv {
  REDIS_PORT: string;
  REDIS_HOST: string;
  REDIS_USER: string;
  REDIS_PWD: string;
  REDIS_DB: string;
  // any other vars should be added here
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends LendeskProcessEnv { }
  }
}
