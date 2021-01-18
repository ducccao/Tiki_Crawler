var Crawler = require("crawler");
const cheerio = require("cheerio");

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
c.queue([{
    uri: "https://tiki.vn/",
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
            console.log($("div").text());
        }
        done();
    },
}, ]);

// Queue some HTML code directly without grabbing (mostly for tests)
c.queue([{
    html: "<p>This is a <strong>test</strong></p>",
}, ]);