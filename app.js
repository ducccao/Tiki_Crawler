const cheerio = require("cheerio");
const config = require("./config/default.json");
const query = require("./database/query");
const rp = require("request-promise");
const functions = require("./functionsCrawl/functions");

// Queue URLs with custom callbacks & parameters

function crawl(url) {
    const options = {
        uri: url,
        transform: function(body) {
            //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
            //  console.log(body.body);
            return cheerio.load(body);
        },
    };

    (async function crawler() {
        try {
            // Lấy dữ liệu từ trang crawl đã được parseDOM
            var $ = await rp(options);
        } catch (error) {
            return error;
        }

        //console.log($.html());

        const avatarWrap = config.tiki.user.wrapClass;

        // Crawl full des
        const fullDesWrap = config.tiki.fullDes.tableWrapClass;
        const fullDesContent = $(`${fullDesWrap} td`).text().trim();
        // Crawl product Details
        functions.CrawlProductDetail($);
        // Crawl
    })();
}

//-------------------------
//-- Common Input
//-------------------------

const url = `https://tiki.vn/combo-2-lan-khu-mui-nuoc-hoa-enchanteur-charming-50ml-chai-p58673652.html`;
const url2 = `https://tiki.vn/combo-2-lan-khu-mui-nuoc-hoa-enchanteur-charming-50ml-chai-p58673652/nhan-xet/5180704`;
const url3 = `https://freetuts.net/reactjs/tu-hoc-reactjs`;

//-------------------------
//-- Functions Crawl
//-- Input: URL
//-- Output: Records In Database
//-------------------------
crawl(url);

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