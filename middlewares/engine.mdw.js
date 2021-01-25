const expressHandlebars = require("express-handlebars");

module.exports = function (app) {
  app.engine(
    "hbs",
    expressHandlebars({
      defaultLayout: "home.hbs",
      extname: ".hbs",
      layoutsDir: "views/_layouts",
      partialsDir: "views/_partials",
      helpers: {},
    })
  );

  app.set("view engine", "hbs");
};
