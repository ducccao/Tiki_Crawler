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

    function userURLFromTo(url, from, to) {
      const userArrURL = [];
      for (let i = from; i <= to; ++i) {
        const temp = url + `/${i}`;
        userArrURL.push(temp);
      }
      return userArrURL;
    }

    const durex_url = `https://tiki.vn/bao-cao-su-invisible-durex-3s-3-bao-hop-100930570-p796867/nhan-xet`;
    const durex_from = `6816200`;
    const durex_to = `6816900`;
    const durex_user_arr = userURLFromTo(durex_url, durex_from, durex_to);

    const durex_ret = [];
    for (let i = 0; i < durex_user_arr.length; ++i) {
      const durex_status = await functionsTechnical.CrawlManyUsers(
        durex_user_arr[i]
      );
      durex_ret.push(durex_status);
    }

    const skin_url = `https://tiki.vn/sua-rua-mat-cetaphil-gentle-skin-cleaner-500ml-8394107341305-9318637069637-p1362447/nhan-xet`;
    const skin_from = `4079500`;
    const skin_to = `4079999`;
    const skin_user_arr = userURLFromTo(skin_url, skin_from, skin_to);

    const skin_ret = [];
    for (let i = 0; i < durex_user_arr.length; ++i) {
      const skin_status = await functionsTechnical.CrawlManyUsers(
        skin_user_arr[i]
      );
      durex_ret.push(skin_status);
    }

    return [durex_ret, skin_ret];
  },
};
