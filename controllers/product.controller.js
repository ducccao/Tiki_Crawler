const proDetailModel = require("./../models/proDetail.model");
const productModel = require("./../models/product.model");

const proDetailController = {
    insertRecordsIntoDB: async(entity, tableName) => {
        const insertStatus = await productModel.insertIntoDB(entity, tableName);
        // console.log(insertStatus);
        return `Inserted Into ${tableName} -  ${insertStatus.affectedRows} Records!`;
    },
};

module.exports = proDetailController;