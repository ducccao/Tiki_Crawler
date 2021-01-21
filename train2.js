// External dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const chalk = require("chalk");

const url = "https://mybk.hcmut.edu.vn/my/index.action";
const outputFile = "data.json";
const parsedResults = [];
const pageLimit = 10;
let pageCounter = 0;
let resultCount = 0;

const getWebsiteContent = async (url) => {
  try {
    console.log(
      chalk.red(`\n  Scraping of ${chalk.underline.bold(url)} initiated...\n`)
    );

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // New Lists
    $(".item").map((i, el) => {
      const count = resultCount++;
      const text = $(el).text();

      const metadata = {
        count: count,
        text: text,
      };
    });
    parsedResults.push(1);

    // Pagination Elements Link

    pageCounter++;

    if (pageCounter === 200) {
      exportResults(parsedResults);
      return false;
    }

    getWebsiteContent(url);

    //   console.log($);
  } catch (error) {
    exportResults(parsedResults);
    console.error(error);
  }
};

getWebsiteContent(url);

const exportResults = (parsedResults) => {
  fs.writeFile(outputFile, JSON.stringify(parsedResults, null, 4), (err) => {
    if (err) {
      console.log(err);
    }
    console.log(
      chalk.yellow.bgBlue(
        `\n ${chalk.underline.bold(
          parsedResults.length
        )} Results exported successfully to ${chalk.underline.bold(
          outputFile
        )}\n`
      )
    );
  });
};
