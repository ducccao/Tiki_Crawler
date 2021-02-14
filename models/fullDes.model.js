const db = require("./../database/ConnectDB");
const config = require("./../config/default.json");

module.exports = {
  all: () => {
    const sql = `select * from ${config.database.table.productdescription}`;
    return db.load(sql);
  },
  insert: (entity, tbName) => {
    return db.insert(entity, tbName);
  },
  getManyURLFulDes: () => {
    const sql = `select proDetailURL from ${config.database.table.products}`;
    return db.load(sql);
  },
};
