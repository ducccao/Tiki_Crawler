const functionsTechnical = require("./../functionsCrawlTechnical/functions");
const config = require("./../config/default.json");
const proDetailController = require("./../controllers/proDetail.controller");

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

        console.log(insertProDetailStatus);
    },
};