const db = require("./ConnectDB");
const config = require("./../config/default.json");

module.exports = {
    getAllUsers: async() => {
        const sql = `select * from ${config.database.table.users} `;
        const users = db.load(sql);
        return users;
    },
    getAllProducts: async() => {
        const sql = `select * from ${config.database.table.products}`;
        const products = db.load(sql);
        return products;
    },
};