const homeController = {
  getHomePage: (req, res) => {
    res.render("vwHome/Home", {
      layout: "home",
    });
  },
};

module.exports = homeController;
