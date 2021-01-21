const cheerio = require("cheerio");
const config = require("./config/default.json");
const query = require("./database/query");
const requestPromise = require("request-promise");
const functions = require("./functionsCrawl/functions");
const axios = require("axios");

// Queue URLs with custom callbacks & parameters

function crawl(url) {
    const options = {
        uri: url,
        transform: function(body) {
            //  console.log(body.body);
            return cheerio.load(body);
        },
    };

    (async function crawler() {
        try {
            // Lấy dữ liệu từ trang crawl đã được parseDOM
            var $ = await requestPromise(options);
        } catch (error) {
            return error;
        }

        // Crawl Many product
        const productStatus = await functions.CrawlProduct($);
        console.log(productStatus);

        // Crawl Many product Details
        //const prodtManyStatus = await functions.CrawManyProDetail();
        //console.log(prodtManyStatus);

        // Crawl FullDes 1 product
        //const fullDes1Status = await functions.CrawFullDes($);

        // Crawl Many FulDes
        // const fulDesManyStatus = await functions.CrawManyFullDes();
    })();
}




//-------------------------
//-- Common Input
//-------------------------

// test url
const test1url = `http://listverse.com/`,

    // URL - proDetails
    const url = `https://tiki.vn/combo-2-lan-khu-mui-nuoc-hoa-enchanteur-charming-50ml-chai-p58673652.html`;
// URL - Products
const url2 = `https://tiki.vn/lam-dep-suc-khoe/c1520`;
const proURL_2 = `https://tiki.vn/lam-dep-suc-khoe/c1520?page=2&src=c.1520.hamburger_menu_fly_out_banner`;
const proURL_3 = `https://tiki.vn/lam-dep-suc-khoe/c1520?page=3&src=c.1520.hamburger_menu_fly_out_banner`;

// URL - FULDES
const fullDesURL_1 = `https://tiki.vn/dung-cu-giai-toa-cho-nu-rung-ngoay-love-vibe-ssi-japan-chat-lieu-silicone-cao-cap-mem-mai-5-tan-so-rung-ngoay-p73885155.html?spid=73885161`;
const fullDesURL_2 = `https://tiki.vn/bon-ngam-chan-hong-ngoai-lanaform-luxury-p12219567.html?spid=73720823&src=ss-ads`;
// URL - User
const url3 = `https://freetuts.net/reactjs/tu-hoc-reactjs`;

// URL  - PURE
const PURE_URL = `https://tiki.vn/lam-dep-suc-khoe/c1520?src=c.1520.hamburger_menu_fly_out_banner`;
const PURE_URL_PAGI_2 = `https://tiki.vn/trang-diem/c1584?page=5&src=static_block`;
const PURE_URL_PAGI_5 = `https://tiki.vn/lam-dep-suc-khoe/c1520?page=5&src=c.1520.hamburger_menu_fly_out_banner`;

//-------------------------
//-- Functions Crawl
//-- Input: URL
//-- Output: Records In Database
//-------------------------

crawl(PURE_URL);

//-------------------------
//-- Watch Records Database
//-------------------------
async function HookProducts() {
    const products = await query.getAllProducts();
    console.log(products);
}

async function HookUsers() {
    const users = await query.getAllUsers();
    console.log(users);
}

async function HookProDetails() {
    const proDetails = await query.getAllProDetails();
    console.log(proDetails);
}

// HookProduct();
// HookUsers();
// HookProDetails();

//-------------------------
//-- Crawl Prodetail
//-------------------------
async function CrawlProDetailHander() {
    const status = await functions.CrawManyProDetail();
}
//CrawlProDetailHander();

//-------------------------
//-- Crawl Prodetail
//-------------------------
async function CrawlFullDesHanler() {
    // const status = await functions.CrawFullDes($);
}
//CrawlFullDesHanler();