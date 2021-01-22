const functionsTechnical = require("./../functionsCrawlHanlder/functions");
const config = require("./../config/default.json");
const proDetailController = require("./../controllers/proDetail.controller");
const productController = require("./../controllers/product.controller");
const productModel = require("../models/product.model");
const fulDessModel = require("./../models/fullDes.model");
const fullDesModel = require("./../models/fullDes.model");
const axios = require("axios");
const chalk = require("chalk");
const cheerio = require("cheerio");
const userModel = require("./../models/user.model");

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

    const ret = [];
    for (let i = 0; i < prodtURLArr.length; ++i) {
      const status = await functionsTechnical.CrawlManyProDetal(
        config.tiki.pure_url + prodtURLArr[i]
      );
      ret.push(status);
    }

    return ret;
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

  // Crawl many fuldes
  async CrawManyFullDes() {
    const arrFuldesURLData = await fullDesModel.getManyURLFulDes();
    const arrFuldesURL = [];
    for (let i = 0; i < arrFuldesURLData.length; ++i) {
      arrFuldesURL.push(arrFuldesURLData[i].proDetailURL);
    }
    //console.log(arrFuldesURL);

    const ret = [];
    for (let i = 0; i < arrFuldesURL.length; ++i) {
      const status = await functionsTechnical.CrawlManyFulDes(
        config.tiki.pure_url + arrFuldesURL[i]
      );
      ret.push(status);
    }

    return ret;
  },

  // Crawl One User
  async CrawlAnUser($) {
    const userCrawled = await functionsTechnical.CrawlUser($);

    const entity = {
      fullDes: `${fullDesCrawled}`,
    };

    const status = await fulDessModel.insert(
      entity,
      config.database.table.productdescription
    );
    console.log(status);
  },

  // Crawl Many Users
  async CrawManyUsers() {
    const userURLArrData = await userModel.getManyUserURL();
    const userURLArr = [];
    const from = `6495600`;
    const to = `6495999`;

    const from2 = `6950500`;
    const to2 = `6950800`;

    const pure_url = `https://tiki.vn/bon-ngam-chan-massage-cao-cap-usa-6-con-lan-tu-dong-voi-phun-massage-serenelife-sliftsp12-nhap-khau-p69064268/nhan-xet/${from}`;
    for (let i = from; i < to; ++i) {
      const temp = `https://tiki.vn/bon-ngam-chan-massage-cao-cap-usa-6-con-lan-tu-dong-voi-phun-massage-serenelife-sliftsp12-nhap-khau-p69064268/nhan-xet/${i}`;
      userURLArr.push(temp);
    }
    //console.log(arrFuldesURL);
    const userURLArry2 = [];
    for (let i = from2; i < to2; ++i) {
      const temp2 = `https://tiki.vn/giay-the-thao-nam-biti-s-hunter-street-x-vietmax-2020-bst-hanoi-culture-patchwork-dsmh025-p69068491/nhan-xet/${i}`;
      userURLArry2.push(temp2);
    }

    // const ret = [];
    // for (let i = 0; i < userURLArr.length; ++i) {
    //   const status = await functionsTechnical.CrawlManyUsers(userURLArr[i]);
    //   ret.push(status);
    // }

    const ret2 = [];
    for (let i = 0; i < userURLArry2.length; ++i) {
      const status = await functionsTechnical.CrawlManyUsers(userURLArry2[i]);
      ret2.push(status);
    }

    return ret2;
  },
};
