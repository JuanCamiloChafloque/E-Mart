const express = require("express");
const router = express.Router();

// Controllers
const { getProducts } = require("../controllers/productController");

router.route("/").get(getProducts);

module.exports = router;
