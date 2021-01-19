const functionsTechnical = require("./../functionsCrawlHanlder/functions");
const config = require("./../config/default.json");
const proDetailController = require("./../controllers/proDetail.controller");
const productController = require("./../controllers/product.controller");

module.exports = {
    // When You Start App
    // Using All those functions bellow then Crawl All Recors
    // for the first time

    // Crawl Product Detail
    async CrawlProductDetail($) {
        const CrawlProDetailDataEntity = functionsTechnical.CrawlProductDetailTechnical(
            $
        );
        const insertProDetailStatus = await proDetailController.insertCrawlRecordsIntoDatabase(
            CrawlProDetailDataEntity,
            config.database.table.productdetails
        );

        //  console.log(insertProDetailStatus);
        return insertProDetailStatus;
    },

    // Crawl Product
    async CrawlProduct($) {
        const records = functionsTechnical.CrawlProductTech($);
        const insertProductStatus = await productController.insertManyIntoDB(
            records,
            config.database.table.products
        );

        console.log(insertProductStatus);
    },
};