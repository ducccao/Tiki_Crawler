const db = require("./../database/ConnectDB");
const config = require("./../config/default.json");

module.exports = {
    insertIntoDB: (entity, tableName) => {
        return db.insert(entity, tableName);
    },
};