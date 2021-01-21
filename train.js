const config = require("./config/default.json");
const cheerio = require("cheerio");
const request_promise = require("request-promise");
const proDetailModel = require("./models/proDetail.model");
const productModel = require("./models/product.model");
const fullDesModel = require("./models/fullDes.model");
const chalk = require("chalk");

// Crawl many User
async function CrawlManyUsers(url) {
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
    const core = $(`.review-comment__avatar-name`).text();

    console.log(core);

    // const entity = {
    //   fullDes: core,
    // };

    // const status = await fullDesModel.insert(
    //   entity,
    //   config.database.table.productdescription
    // );
  })();

  return "Inserted 1 FulDes";
}

const url = `https://tiki.vn/combo-2-lan-khu-mui-trang-da-enchanteur-charming-50ml-chai-p58676878/nhan-xet/6138877`;
CrawlManyUsers(url);
