const productModel = require("./../models/product.model");
const proDetailModel = require("./../models/proDetail.model");
const userModel = require("./../models/user.model");
const fuldesModel = require("./../models/fullDes.model");
const fullDesModel = require("./../models/fullDes.model");

const homeController = {
  getHomePage: (req, res) => {
    res.render("vwHome/Home", {
      layout: false,
    });
  },

  getProductsPage: async (req, res) => {
    const products = await productModel.all();

    res.render("vwHome/Product", {
      layout: false,
      products,
    });
  },
  getProDetail: async (req, res) => {
    const proDetails = await proDetailModel.all();
    res.render("vwHome/ProDetail", {
      layout: false,
      proDetails,
    });
  },

  getFulDes: async (req, res) => {
    const fuldess = await fullDesModel.all();
    res.render("vwHome/FulDes", {
      layout: false,
      fuldess,
    });
  },

  getUser: async (req, res) => {
    const users = await userModel.all();
    res.render("vwHome/User", {
      layout: false,
      users,
    });
  },
};

module.exports = homeController;
