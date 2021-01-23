const mysql = require("mysql");
const util = require("util");
const config = require("../config/default.json");

const pool = mysql.createPool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user.username,
  password: config.database.user.password,
  database: config.database.name,
  connectionLimit: 50,
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
  load: (sql) => {
    return pool_query(sql);
  },
  insert: (entity, tableName) => {
    return pool_query(`insert into ${tableName} set ? `, entity);
  },
};
