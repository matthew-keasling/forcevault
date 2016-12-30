const pg = require('pg');
pg.defaults.ssl = true;
const url = require('url');
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');
const pgconfig = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};
var pool = new pg.Pool(pgconfig);
module.exports = pool;
