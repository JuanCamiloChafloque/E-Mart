const express = require("express");
const router = express.Router();

// Controllers
const {
  getProducts,
  createProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
} = require("../controllers/productController");

//Middlewares
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/").get(isAuthenticatedUser, getProducts).post(createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .put(updateSingleProduct)
  .delete(deleteSingleProduct);

module.exports = router;
