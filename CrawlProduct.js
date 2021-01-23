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

const outputFile = __dirname + `/result/products.json`;
const parsedResults = [];
const pageLimit = config.tiki.products.pagination.limit;

let resultCount = 0;

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
    console.log(
      chalk.green(`\n  Crawling of ${chalk.underline.bold(url)} Completed...\n`)
    );

    // Pagi
    // const nextPageLink = $(`${config.tiki.products.pagination.wrapClass}`)
    //   .find(".current")
    //   .parent()
    //   .next()
    //   .find("a")
    //   .attr("href");
    // console.log(nextPageLink);
    // pageCounter++;

    // const nextPageLink = `https://tiki.vn/lam-dep-suc-khoe/c1520?page=${pageCounter}&src=c.1520.hamburger_menu_fly_out_banner`;

    // console.log(chalk.cyan(`  Scraping: ${nextPageLink}`));
    // console.log(chalk.yellow(`  PageCounter: ${pageCounter}`));

    // if (pageCounter > pageLimit) {
    //   exportResults(parsedResults);
    //   return false;
    // }

    // CrawlPagiProduct(nextPageLink);

    //   console.log($);
  } catch (error) {
    // exportResults(parsedResults);
    console.error(error);
  }
}

function getURLByPageCounter(url, pageCounter) {
  const ret = url.replace(`page=1`, `page=${pageCounter}`);
  return ret;
}

// console.log(
//   getURLByPageCounter(
//     "https://tiki.vn/lam-dep-suc-khoe/c1520?page=1&src=c.1520.hamburger_menu_fly_out_banner",
//     5
//   )
// );

async function FinalCrawlProduct() {
  let pageCounter = 1;
  const url = `https://tiki.vn/lam-dep-suc-khoe/c1520?page=1&src=c.1520.hamburger_menu_fly_out_banner`;
  const url2 = `https://tiki.vn/trang-diem-mat/c1585?_lc=Vk4wMzkwMjMwMDg%3D&page=1&src=c.1585.hamburger_menu_fly_out_banner`;
  const url3 = `https://tiki.vn/thiet-bi-cham-soc-suc-khoe/c2307?_lc=Vk4wMzkwMjMwMDg%3D&page=1&src=c.2307.hamburger_menu_fly_out_banner`;
  const url4 = `https://tiki.vn/cham-soc-da-mat/c1582?_lc=Vk4wMzkwMjMwMDg%3D&page=1&src=c.1582.hamburger_menu_fly_out_banner`;
  const url5 = `https://tiki.vn/cham-soc-co-the/c1592?page=1&src=c.1592.hamburger_menu_fly_out_banner`;
  const url6 = `https://tiki.vn/cham-soc-toc-da-dau/c1591?_lc=Vk4wMzkwMjMwMDg%3D&page=1&src=c.1591.hamburger_menu_fly_out_banner`;
  const url7 = `https://tiki.vn/cham-soc-ca-nhan/c1594?_lc=Vk4wMzkwMjMwMDg%3Dpage}=1&src=c.1594.hamburger_menu_fly_out_banner`;
  const url8 = `https://tiki.vn/ho-tro-tinh-duc/c8142?_lc=Vk4wMzkwMjMwMDg%3D&page=1&src=c.8142.hamburger_menu_fly_out_banner`;
  const url9 = `https://tiki.vn/thiet-bi-lam-dep/c2306?_lc=Vk4wMzkwMjMwMDg%3D&page=1&src=c.2306.hamburger_menu_fly_out_banner`;
  const url10 = `https://tiki.vn/bo-san-pham-lam-dep/c8161?_lc=Vk4wMzkwMjMwMDg%3D&page=1&src=c.8161.hamburger_menu_fly_out_banner`;
  const url11 = `https://tiki.vn/nuoc-hoa/c1595?_lc=Vk4wMzkwMjMwMDg%3D&page=1&src=c.1595.hamburger_menu_fly_out_banner`;
  const url12 = `https://tiki.vn/tinh-dau-spa/c11348?_lc=Vk4wMzkwMjMwMDg%3D&page=1&src=c.11348.hamburger_menu_fly_out_banner`;

  const arrayURL = [
    url,
    url2,
    url3,
    url4,
    url5,
    url6,
    url7,
    url8,
    url9,
    url10,
    url11,
    url12,
  ];

  arrayURL.forEach((url) => {
    for (let i = 1; i <= 5; ++i) {
      const nextPageLink = getURLByPageCounter(url, i);
      CrawlPagiProduct(nextPageLink);
    }
  });
}
FinalCrawlProduct();
