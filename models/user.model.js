const db = require("./../database/ConnectDB");
const config = require("./../config/default.json");

module.exports = {
  getManyUserURL() {
    const sql = `select proDetailURL from ${config.database.table.products}`;
    return db.load(sql);
  },
  insert(entity, tblName) {
    return db.insert(entity, tblName);
  },
};
