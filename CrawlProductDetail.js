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

const outputFile = "data.json";
const parsedResults = [];
const pageLimit = config.tiki.products.pagination.limit;
let pageCounter = 1;
let resultCount = 0;
const url = `https://tiki.vn/lam-dep-suc-khoe/c1520?page=${pageCounter}&src=c.1520.hamburger_menu_fly_out_banner`;

// Crawl Product
async function CrawlProduct($) {
  const records = functionsTechnical.CrawlProductTech($);
  const insertProductStatus = await productController.insertManyIntoDB(
    records,
    config.database.table.products
  );
  //     console.log(insertProductStatus);
  return insertProductStatus;
}

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
async function CrawlPagiProduct(url) {
  try {
    console.log(
      chalk.red(`\n  Crawling of ${chalk.underline.bold(url)} initiated...\n`)
    );

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const CrawlProductNotPagiStatus = await CrawlProduct($);
    parsedResults.push(CrawlProductNotPagiStatus);
    //   console.log(CrawlProductNotPagiStatus);

    // Pagi
    // const nextPageLink = $(`${config.tiki.products.pagination.wrapClass}`)
    //   .find(".current")
    //   .parent()
    //   .next()
    //   .find("a")
    //   .attr("href");
    // console.log(nextPageLink);
    pageCounter++;

    const nextPageLink = `https://tiki.vn/lam-dep-suc-khoe/c1520?page=${pageCounter}&src=c.1520.hamburger_menu_fly_out_banner`;

    // console.log(chalk.cyan(`  Scraping: ${nextPageLink}`));
    // console.log(chalk.yellow(`  PageCounter: ${pageCounter}`));

    if (pageCounter > pageLimit) {
      exportResults(parsedResults);
      return false;
    }

    CrawlPagiProduct(nextPageLink);

    //   console.log($);
  } catch (error) {
    // exportResults(parsedResults);
    console.error(error);
  }
}

CrawlPagiProduct(url);
