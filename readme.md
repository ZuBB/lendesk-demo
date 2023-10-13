## Boostrap

* ..


## Things to improve
* applying `.d.ts` files through `reference` is not scalable
* Redis related things (_I did not work with Redis for a very long time, so my knowledge probably is weak/outdated_):
  * other config options we might need (timeout, connectionName, TTL, etc)
  * some sort of separation (kind of tables in RDBMS) for different types of data
  * ensure db is not accesible from outside
  *
* Logging. `console.*()` works bad for production. winston?
* "/protected" route is just an example. checking of authrization in it scales bad. that check need to be moved to somewhere else. Middleware most probably
* right now "app.route-handlers.ts" holds everything. handlers of each resource may/should be in separate file;
* registering of new routes may/should be in separate file. Possibly with some dynamic approach
* registering of middlewares through `app.use*()` may be moved to separate function/file if we have them a lot or their configuration is lengthy
*