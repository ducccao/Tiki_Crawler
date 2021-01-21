const cheerio = require("cheerio");
const config = require("./config/default.json");
const query = require("./database/query");
const requestPromise = require("request-promise");
const functions = require("./functionsCrawl/functions");
const fs = require("fs");
const functionsTechnical = require("./functionsCrawlHanlder/functions");
const productController = require("./controllers/product.controller");

const axios = require("axios");
const chalk = require("chalk");

const outputFile = __dirname + `/result/proDetails.json`;

const parsedResults = [];
const pageLimit = config.tiki.products.pagination.limit;
let pageCounter = 1;
let resultCount = 0;
const url = `https://tiki.vn/lam-dep-suc-khoe/c1520?page=${pageCounter}&src=c.1520.hamburger_menu_fly_out_banner`;

const exportResults = (parsedResults) => {
  fs.writeFile(outputFile, JSON.stringify(parsedResults, null, 4), (err) => {
    if (err) {
      console.log(err);
    }
    console.log(
      chalk.green(
        `\n ${chalk.underline.bold(
          parsedResults.length
        )} Results exported successfully to ${chalk.underline.bold(
          outputFile
        )}\n`
      )
    );
  });
};

// Crawl Pagi Product
async function CrawlProDetail() {
  try {
    const prodtManyStatus = await functions.CrawManyProDetail();
    //  console.log();
    parsedResults.push(prodtManyStatus);

    exportResults(prodtManyStatus);
    //   console.log($);
  } catch (error) {
    // exportResults(parsedResults);
    console.error(error);
  }
}

CrawlProDetail();
