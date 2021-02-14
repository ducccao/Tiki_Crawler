const db = require("./../database/ConnectDB");
const config = require("./../config/default.json");

module.exports = {
  all: () => {
    const sql = `select * from ${config.database.table.productdetails}`;
    return db.load(sql);
  },
  insertCrawlRecordsIntoDatabase: (entity, tableName) => {
    return db.insert(entity, tableName);
  },
  insert: (entity, tableName) => {
    return db.insert(entity, tableName);
  },
};
