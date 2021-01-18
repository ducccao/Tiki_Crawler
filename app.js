var Crawler = require("crawler");
const cheerio = require("cheerio");
const express = require("express");
const db = require("./middlewares/ConnectDB");
const config = require("./config/default.json");

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

const url = `https://tiki.vn/`;

function craw(url) {
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
                const $ = cheerio.load(html);

                const arraySrcIMG = [];
                // for(let i=0;i<$("div").length;++i){
                //     arrayDiv.push({
                //         textContent:  $("div")[i].text
                //     })
                // }
                let temp = $("img");

                for (let i = 0; i < temp.length; ++i) {
                    //  console.log(temp[i].attribs.src);
                    arraySrcIMG.push({
                        linkImg: temp[i].attribs.src,
                    });
                }

                console.log(arraySrcIMG);
                //console.log(temp.map(e));

                // console.log(temp);

                //console.log(arrayDiv);
            }
            done();
        },
    }, ]);
}

async function test() {
    const sql = `select * from ${config.database.table.users}`;
    const users = await db.load(sql);
    console.log(users);
}
test();