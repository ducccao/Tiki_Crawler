const config = require("../config/default.json");

module.exports = {
    // Crawl Product Detail Technical
    CrawlProductDetailTechnical: ($) => {
        const proDetailsWrap = config.tiki.productDetails.tableWrapClass;
        const core = $(`${proDetailsWrap} tr > td:nth-child(2)`);
        //   const proDetailContent = $(`${proDetailsWrap} tr > td:nth-child(2)`).text();
        const proDetailArrayData = [];
        const proDetailData = [];

        for (let i = 0; i < core.length; ++i) {
            for (let j = 0; j < core[i].children.length; ++j) {
                proDetailArrayData.push(core[i].children[j].data);
            }
        }

        proDetailData.push({
            tradeMark: proDetailArrayData[0],
            branchOrigin: proDetailArrayData[1],
            expiryDate: proDetailArrayData[2],
            SKU: proDetailArrayData[3],
        });

        //console.log(core.length);
        //console.log(proDetailArrayData);
        //  console.log(proDetailData);
        return proDetailData[0];
    },

    // Crawl Product Tech
    CrawlProductTech: ($) => {
        const proNameTrigger = config.tiki.products.proName;
        const coreProName = $(`${proNameTrigger}`);
        const proNameDataArray = [];

        for (let i = 0; i < coreProName.length; ++i) {
            for (let j = 0; j < coreProName[i].children.length; j++) {
                proNameDataArray.push({
                    proName: coreProName[i].children[j].data,
                });
            }
        }

        const priceTrigger = config.tiki.products.price;
        const corePrice = $(`${priceTrigger}`);
        const priceDataArray = [];

        for (let i = 0; i < corePrice.length; ++i) {
            for (let j = 0; j < corePrice[i].children.length; j++) {
                priceDataArray.push({
                    price: corePrice[i].children[j].data,
                });
            }
        }

        //  console.log(coreProName.length);
        // console.log(corePrice.length);

        //  console.log(proNameDataArray);
        //  console.log(priceDataArray);

        const mergeArray = [];

        for (let k = 0; k < proNameDataArray.length; k++) {
            const product = {
                proName: proNameDataArray[k].proName,
                price: priceDataArray[k].price,
            };
            mergeArray.push(product);
        }

        //  console.log(mergeArray);
        return mergeArray;
    },
};