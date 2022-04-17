const express = require("express");
const router = express.Router();

// Controllers
const {
  getProducts,
  createProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  createReview,
  getProductReviews,
  deleteProductReview,
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

router
  .route("/:id/review")
  .get(isAuthenticatedUser, getProductReviews)
  .put(isAuthenticatedUser, createReview);

router
  .route("/:id/review/:reviewId")
  .delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;
