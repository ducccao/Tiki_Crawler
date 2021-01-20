const db = require("./../database/ConnectDB");
const config = require("./../config/default.json");

module.exports = {
    insert: (entity, tbName) => {
        return db.insert(entity, tbName);
    },
};