const db = require("./../database/ConnectDB");
const config = require("./../config/default.json");

module.exports = {
    insertCrawlRecordsIntoDatabase: (entity, tableName) => {
        return db.insert(entity, tableName);
    },
};