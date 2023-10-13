## Boostrap

* npm i
* brew install redis (or use Docker file)


## Things to improve
* applying `.d.ts` files through `reference` is not scalable
* Redis related things (_I did not work with Redis for a very long time, so my knowledge probably is weak/outdated_):
  * other config options we might need (timeout, connectionName, TTL, etc)
  * some sort of separation (kind of tables in RDBMS) for different types of data
  * ensure db is not accesible from outside
  * creds to access the server
* Logging. `console.*()` works bad for production. Any winston-like libs?
* "/protected" route is just an example. checking of authrization in it scales bad. that check need to be moved to somewhere else. Middleware most probably
* right now "app.route-handlers.ts" holds everything. handlers of each resource may/should be in separate file;
* routes registration may/should be in separate file. Especially if we have a lot of them Possibly with some dynamic approach
* registering of middlewares through `app.use*()` may be moved to separate function/file if we have a lot it or their configuration is lengthy
* use constants instead of hardcode
* pass all validation errors to client
* clusterization for running in prod. pm2?
* tests: unit/e2e/integartion?
* better approach for handling sessions. what kind of token and where to store
* all content of `index.html` is just for purposes of demoing how API works.
* FE assets should be served separately in prod (nginx/AWS S3/..)
* revise validity of bcrypt usage as of today. maybe replace with argon2?
* types: check for any/implicit types.
* error handling: next() vs middleware
* "getSafelyDbResult()" should not be used directly in controller(s). only in service files. with proper handling of session it will go away from `app.controller.ts`
* errorMessage vs statusMessage vs errorMessage[]
* docker: img size optimization, variables, etc
* ...