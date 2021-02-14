const router = require("express").Router();
const homeController = require("./../controllers/home.controller");

router.get("/", homeController.getHomePage);
router.get("/product", homeController.getProductsPage);
router.get("/pro-detail", homeController.getProDetail);
router.get("/fuldes", homeController.getFulDes);
router.get("/user", homeController.getUser);

module.exports = router;
