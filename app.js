var Crawler = require("crawler");
const cheerio = require("cheerio");
const express = require("express");
const db = require("./database/ConnectDB");
const config = require("./config/default.json");
const query = require("./database/query");

var c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function(error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
        }
        done();
    },
});

// Queue URLs with custom callbacks & parameters

const url = `https://tiki.vn/combo-2-lan-khu-mui-nuoc-hoa-enchanteur-charming-50ml-chai-p58673652.html`;

function crawl(url) {
    c.queue([{
        uri: url,
        jQuery: false,

        // The global callback won't be called
        callback: function(error, res, done) {
            if (error) {
                console.log(error);
            } else {
                //console.log("Grabbed", res.body.length, "bytes");
                // console.log(res.body);
                const html = res.body;
                const tempHTML = `<h2 class="title">Hello world</h2>
                <h2 class="title2">Hello world2222</h2>
                `;

                console.log(html);

                const $ = cheerio.load(html);
                //  console.log($("h2").text());

                console.log($("h2").attr("class"));

                const h2 = $("h2").toArray();

                for (let i = 0; i < h2.length; ++i) {
                    for (let j = 0; j < h2[i].children.length; ++j) {
                        console.log(h2[i].children[j].data);
                    }
                    //  console.log(h2[i].children.data);
                }

                const arraySrcIMG = [];
                const arrayUserName = [];

                const userTagNeedHook = config.tiki.user.usernameTag;
                const usernameClass = config.tiki.user.usernameClass;

                let temp = $(`${userTagNeedHook}`);

                // console.log($(`.${usernameClass}`));

                for (let i = 0; i < temp.length; ++i) {
                    console.log(temp[i].attribs);

                    for (let j = 0; j < temp[i].children.length; ++j) {
                        arrayUserName.push({
                            userName: temp[i].children[j].data,
                        });
                    }
                }

                //    console.log(arrayUserName);

                // console.log(arraySrcIMG);
                //console.log(temp.map(e));

                // console.log(temp);

                //console.log(arrayDiv);
            }
            done();
        },
    }, ]);
}

crawl(url);

async function HookProduct() {
    const products = await query.getAllProducts();
    console.log(products);
}

// HookProduct();