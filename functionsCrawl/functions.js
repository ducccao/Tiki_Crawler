const functionsTechnical = require("./../functionsCrawlHanlder/functions");
const config = require("./../config/default.json");
const proDetailController = require("./../controllers/proDetail.controller");
const productController = require("./../controllers/product.controller");
const productModel = require("../models/product.model");
const fulDessModel = require("./../models/fullDes.model");

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
        //     console.log(insertProductStatus);
        return insertProductStatus;
    },

    // Crawl Many Product Detail
    async CrawManyProDetail() {
        const prodtURLArr = [];
        const prodtURLData = await productModel.getAllProDetailURL();

        for (let d = 0; d < prodtURLData.length; ++d) {
            prodtURLArr.push(prodtURLData[d].proDetailURL);
        }

        //  console.log(prodtURLArr);

        let count = 0;
        for (let i = 0; i < prodtURLArr.length; ++i) {
            const prodtData = await functionsTechnical.CrawlManyProDetal(
                config.tiki.pure_url + prodtURLArr[i]
            );
        }

        //  return `Inserted Into ${config.database.table.productdetails} -  ${count} Records!`;
        // console.log(prodtURLArr);
    },

    // Crawl fullDes
    async CrawFullDes($) {
        const fullDesCrawled = await functionsTechnical.CrawlFullDes($);

        const entity = {
            fullDes: `${fullDesCrawled}`,
        };

        const status = await fulDessModel.insert(
            entity,
            config.database.table.productdescription
        );
        console.log(status);
    },
};