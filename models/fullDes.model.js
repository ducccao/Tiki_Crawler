const db = require("./../database/ConnectDB");
const config = require("./../config/default.json");

module.exports = {
    insert: (entity, tbName) => {
        return db.insert(entity, tbName);
    },
    getManyURLFulDes: () => {
        const sql = `select proDetailURL from ${config.database.table.products}`;
        return db.load(sql);
    },
};