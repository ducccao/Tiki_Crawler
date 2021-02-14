const db = require("./../database/ConnectDB");
const config = require("./../config/default.json");

module.exports = {
  insertIntoDB: (entity, tableName) => {
    return db.insert(entity, tableName);
  },
  all: () => {
    const sql = `select * from ${config.database.table.products} limit 10000`;
    return db.load(sql);
  },
  getAllProDetailURL: () => {
    const sql = `select proDetailURL from ${config.database.table.products}`;
    return db.load(sql);
  },
};
