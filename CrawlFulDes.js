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

const outputFile = __dirname + `/result/fulDes.json`;

const parsedResults = [];

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
    const fuldesStatus = await functions.CrawManyFullDes();

    parsedResults.push(fuldesStatus);

    exportResults(fuldesStatus);
  } catch (error) {
    exportResults(parsedResults);
    console.error(error);
  }
}

CrawlProDetail();
