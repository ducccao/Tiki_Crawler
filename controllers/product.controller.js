const proDetailModel = require("./../models/proDetail.model");
const productModel = require("./../models/product.model");

const proDetailController = {
    insertRecordsIntoDB: async(entity, tableName) => {
        const insertStatus = await productModel.insertIntoDB(entity, tableName);
        // console.log(insertStatus);
        return `Inserted Into ${tableName} -  ${insertStatus.affectedRows} Records!`;
    },
    insertManyIntoDB: async(records, tableName) => {
        let count = 0;
        for (let i = 0; i < records.length; ++i) {
            const insertIndex = await productModel.insertIntoDB(
                records[i],
                tableName
            );
            console.log(insertIndex);
            count++;
        }
        return `Inserted Into ${tableName} -  ${count} Records!`;
    },
};

module.exports = proDetailController;