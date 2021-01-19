const db = require("./ConnectDB");
const config = require("./../config/default.json");

module.exports = {
    getAllUsers: () => {
        const sql = `select * from ${config.database.table.users} `;
        const users = db.load(sql);
        return users;
    },
    getAllProducts: () => {
        const sql = `select * from ${config.database.table.products}`;
        const products = db.load(sql);
        return products;
    },
    getAllProDetails: () => {
        const sql = `select * from ${config.database.table.productdetails}`;
        const proDetails = db.load(sql);
        return proDetails;
    },
};