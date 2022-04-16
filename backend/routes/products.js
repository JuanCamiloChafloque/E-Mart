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
const {
  isAuthenticatedUser,
  isAuthorizedRoles,
} = require("../middleware/auth");

router
  .route("/")
  .get(getProducts)
  .post(isAuthenticatedUser, isAuthorizedRoles("admin"), createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .put(isAuthenticatedUser, isAuthorizedRoles("admin"), updateSingleProduct)
  .delete(isAuthenticatedUser, isAuthorizedRoles("admin"), deleteSingleProduct);

module.exports = router;
