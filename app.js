const cheerio = require("cheerio");
const config = require("./config/default.json");
const query = require("./database/query");
const requestPromise = require("request-promise");
const functions = require("./functionsCrawl/functions");

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

        // Crawl product
        //const productStatus = await functions.CrawlProduct($);
        // console.log(productStatus);

        // Crawl product Details
        const prodtManyStatus = await functions.CrawManyProDetail();
        console.log(prodtManyStatus);
    })();
}

//-------------------------
//-- Common Input
//-------------------------

// URL - proDetails
const url = `https://tiki.vn/combo-2-lan-khu-mui-nuoc-hoa-enchanteur-charming-50ml-chai-p58673652.html`;
// URL - Products
const url2 = `https://tiki.vn/lam-dep-suc-khoe/c1520`;
const proURL_2 = `https://tiki.vn/lam-dep-suc-khoe/c1520?page=2&src=c.1520.hamburger_menu_fly_out_banner`;
const proURL_3 = `https://tiki.vn/lam-dep-suc-khoe/c1520?page=3&src=c.1520.hamburger_menu_fly_out_banner`;
// URL - User
const url3 = `https://freetuts.net/reactjs/tu-hoc-reactjs`;

//-------------------------
//-- Functions Crawl
//-- Input: URL
//-- Output: Records In Database
//-------------------------
crawl(proURL_3);

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