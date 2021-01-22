const proDetailModel = require("./../models/proDetail.model");
const userModel = require("./../models/user.model");

const proDetailController = {
  insert: async (entity, tableName) => {
    const insertStatus = await userModel.insert(entity, tableName);
    // console.log(insertStatus);
    return `Inserted Into ${tableName} -  ${insertStatus.affectedRows} Records!`;
  },
  insertMany: async (records, tableName) => {
    let count = 0;
    for (let i = 0; i < records.length; ++i) {
      const insertIndex = await productModel.insertIntoDB(
        records[i],
        tableName
      );
      // console.log(insertIndex);
      count++;
    }
    return `Inserted Into ${tableName} -  ${count} Records!`;
  },
};

module.exports = proDetailController;
