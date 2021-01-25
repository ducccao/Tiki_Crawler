const express = require("express");

module.exports = function (app) {
  app.use("/public", express.static("Client"));
  app.use("/", require("./../routes/home.route"));
};
