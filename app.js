const cheerio = require("cheerio");
const express = require("express");
const db = require("./database/ConnectDB");
const config = require("./config/default.json");
const query = require("./database/query");
const crawler = require("crawler");
const rp = require("request-promise");
const fs = require("fs");
const functions = require("./functions/functions");
const proDetailController = require("./controllers/proDetail.controller");

const url = `https://tiki.vn/combo-2-lan-khu-mui-nuoc-hoa-enchanteur-charming-50ml-chai-p58673652.html`;

const url2 = `https://tiki.vn/combo-2-lan-khu-mui-nuoc-hoa-enchanteur-charming-50ml-chai-p58673652/nhan-xet/5180704`;

const URL = `https://freetuts.net/reactjs/tu-hoc-reactjs`;
// Queue URLs with custom callbacks & parameters

function crawl(url) {
    const options = {
        uri: url,
        transform: function(body) {
            //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
            //  console.log(body.body);
            return cheerio.load(body);
        },
    };

    (async function crawler() {
        try {
            // Lấy dữ liệu từ trang crawl đã được parseDOM
            var $ = await rp(options);
        } catch (error) {
            return error;
        }

        //console.log($.html());

        const avatarWrap = config.tiki.user.wrapClass;

        // Crawl full des
        const fullDesWrap = config.tiki.fullDes.tableWrapClass;
        const fullDesContent = $(`${fullDesWrap} td`).text().trim();
        // Crawl product Details
        const proDetail = [];
        const CrawlProDetailDataEntity = functions.CrawlProductDetail($);
        const insertProDetailStatus = await proDetailController.insertCrawlRecordsIntoDatabase(
            CrawlProDetailDataEntity,
            config.database.table.productdetails
        );

        console.log(insertProDetailStatus);
    })();
}

crawl(url);
//crawl(url2);

//crawl(url);

async function HookProduct() {
    const products = await query.getAllProducts();
    console.log(products);
}

// HookProduct();