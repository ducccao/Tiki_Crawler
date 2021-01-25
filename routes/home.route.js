const router = require("express").Router();
const homeController = require("./../controllers/home.controller");

router.get("/", homeController.getHomePage);

module.exports = router;
