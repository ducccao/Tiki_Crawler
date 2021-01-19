const proDetailModel = require("./../models/proDetail.model");

const proDetailController = {
    insertCrawlRecordsIntoDatabase: async(entity, tableName) => {
        const insertStatus = await proDetailModel.insertCrawlRecordsIntoDatabase(
            entity,
            tableName
        );
        console.log(insertStatus);
        return `Inserted Into ${tableName} -  ${insertStatus.affectedRows} Records!`;
    },
};

module.exports = proDetailController;