const config = require("../config/default.json");
const cheerio = require("cheerio");
const request_promise = require("request-promise");
const proDetailModel = require("./../models/proDetail.model");
const productModel = require("../models/product.model");
const fullDesModel = require("../models/fullDes.model");
const chalk = require("chalk");
const userController = require("./../controllers/user.controller");

module.exports = {
  // Crawl Product Detail Technical
  CrawlProductDetailTechnical: ($) => {
    const proDetailsWrap = config.tiki.productDetails.tableWrapClass;
    const core = $(`${proDetailsWrap} tr > td:nth-child(2)`);
    //   const proDetailContent = $(`${proDetailsWrap} tr > td:nth-child(2)`).text();
    const proDetailArrayData = [];
    const proDetailData = [];

    for (let i = 0; i < core.length; ++i) {
      for (let j = 0; j < core[i].children.length; ++j) {
        proDetailArrayData.push(core[i].children[j].data);
      }
    }

    proDetailData.push({
      tradeMark: proDetailArrayData[0],
      branchOrigin: proDetailArrayData[1],
      expiryDate: proDetailArrayData[2],
      SKU: proDetailArrayData[3],
    });

    //console.log(core.length);
    //console.log(proDetailArrayData);
    //  console.log(proDetailData);
    return proDetailData[0];
  },

  // Crawl Product Tech
  CrawlProductTech: ($) => {
    // proName
    const proNameTrigger = config.tiki.products.proName;
    const coreProName = $(`${proNameTrigger}`);
    const proNameDataArray = [];

    for (let i = 0; i < coreProName.length; ++i) {
      for (let j = 0; j < coreProName[i].children.length; j++) {
        proNameDataArray.push({
          proName: coreProName[i].children[j].data,
        });
      }
    }

    // proPrice

    const priceTrigger = config.tiki.products.price;
    const corePrice = $(`${priceTrigger}`);
    const priceDataArray = [];

    for (let i = 0; i < corePrice.length; ++i) {
      for (let j = 0; j < corePrice[i].children.length; j++) {
        priceDataArray.push({
          price: corePrice[i].children[j].data,
        });
      }
    }

    //  console.log(coreProName.length);
    // console.log(corePrice.length);

    //  console.log(proNameDataArray);
    //  console.log(priceDataArray);

    // proDetailURL
    const prodtURLTrigger = config.tiki.products.proDetailURL;
    const coreURL = $(`${prodtURLTrigger}`);
    const prodtURLArray = [];

    for (let d = 0; d < coreURL.length; ++d) {
      prodtURLArray.push({
        proDetailURL: coreURL[d].attribs.href,
      });
    }

    const mergeArray = [];

    for (let k = 0; k < proNameDataArray.length; k++) {
      const product = {
        proName: proNameDataArray[k].proName,
        price: priceDataArray[k].price,
        proDetailURL: prodtURLArray[k].proDetailURL,
      };
      mergeArray.push(product);
    }

    //   console.log(mergeArray);
    return mergeArray;
  },

  // Crawl Many ProDetail
  CrawlManyProDetal: async (url) => {
    console.log(
      chalk.red(`\n  Crawling of ${chalk.underline.bold(url)} initiated...\n`)
    );

    const options = {
      uri: url,
      transform: function (body) {
        //  console.log(body.body);
        return cheerio.load(body);
      },
    };

    (async function crawler() {
      try {
        var $ = await request_promise(options);
      } catch (error) {
        return error;
      }

      const proDetailsWrap = config.tiki.productDetails.tableWrapClass;
      const core = $(`${proDetailsWrap} tr > td:nth-child(2)`);

      //  console.log(core);

      const proDetailArrayData = [];
      const proDetailData = [];

      for (let i = 0; i < core.length; ++i) {
        for (let j = 0; j < core[i].children.length; ++j) {
          proDetailArrayData.push(core[i].children[j].data);
        }
      }

      // handle SKU -- Expire day
      if (
        typeof proDetailArrayData[4] === "undefined" &&
        typeof proDetailArrayData[3] === "undefined"
      ) {
        proDetailData.push({
          tradeMark: proDetailArrayData[0],
          branchOrigin: proDetailArrayData[1],
          SKU: proDetailArrayData[3],
        });
      } else if (typeof proDetailArrayData[4] === "undefined") {
        proDetailData.push({
          tradeMark: proDetailArrayData[0],
          branchOrigin: proDetailArrayData[1],
          branch: proDetailArrayData[2],
          SKU: proDetailArrayData[3],
        });
      } else {
        proDetailData.push({
          tradeMark: proDetailArrayData[0],
          branchOrigin: proDetailArrayData[1],
          branch: proDetailArrayData[2],
          expiryDate: proDetailArrayData[3],
          SKU: proDetailArrayData[4],
        });
      }

      const status = await proDetailModel.insert(
        proDetailData,
        config.database.table.productdetails
      );

      console.log(
        chalk.green(
          `\n  Crawling of ${chalk.underline.bold(url)} Completed...\n`
        )
      );
      //console.log(status);
    })();

    return "Inserted 1 Product Detail";
  },

  // Crawl fullDes
  CrawlFullDes: async ($) => {
    const fullDesTrigger = config.tiki.proDesciption.fullDes_2;
    const coreFullDes = $(`${fullDesTrigger} div`).text();

    return coreFullDes;
  },

  // Crawl many fulDes
  CrawlManyFulDes: async (url) => {
    console.log(
      chalk.red(`\n  Crawling of ${chalk.underline.bold(url)} initiated...\n`)
    );
    const options = {
      uri: url,
      transform: function (body) {
        //  console.log(body.body);
        return cheerio.load(body);
      },
    };

    (async function crawler() {
      try {
        var $ = await request_promise(options);
      } catch (error) {
        return error;
      }
      const fullDesTrigger = config.tiki.proDesciption.fullDes_2;
      const coreFullDes = $(`${fullDesTrigger} div`).text();

      const entity = {
        fullDes: coreFullDes,
      };

      const status = await fullDesModel.insert(
        entity,
        config.database.table.productdescription
      );

      console.log(
        chalk.green(
          `\n  Crawling of ${chalk.underline.bold(url)} Completed...\n`
        )
      );
    })();

    return "Inserted 1 FulDes";
  },

  // Crawl many User
  CrawlManyUsers: async (url) => {
    console.log(
      chalk.red(`\n  Crawling of ${chalk.underline.bold(url)} initiated...\n`)
    );
    const options = {
      uri: url,
      transform: function (body) {
        //  console.log(body.body);
        return cheerio.load(body);
      },
    };

    (async function crawler() {
      try {
        var $ = await request_promise(options);
      } catch (error) {
        return error;
      }

      const userTrigger = config.tiki.user.trigger;
      const core_username = $(`${userTrigger}`);
      const core_user_comment = $(`.review-comment__content`);
      const core_rating = $(`.review-comment__title`);
      let rating = 0;

      if (core_rating.text() === "Rất không hài lòng") {
        rating = 1;
      } else if (core_rating.text() === "Không hài lòng") {
        rating = 2;
      } else if (core_rating.text() === "OK") {
        rating = 3;
      } else if (core_rating.text() === "Hài lòng") {
        rating = 4;
      } else {
        rating = 5;
      }

      let comment = core_user_comment.text();

      if (typeof core_user_comment.text() !== "string") {
        comment = "";
      }

      const entity = {
        userName: core_username.text(),
        comment: comment,
        rating: rating,
      };

      const status = await userController.insert(
        entity,
        config.database.table.users
      );

      console.log(
        chalk.green(
          `\n  Crawling of ${chalk.underline.bold(url)} Completed...\n`
        )
      );
    })();

    return "Inserted an user record!";
  },
};
