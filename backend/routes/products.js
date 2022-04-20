const express = require("express");
const router = express.Router();

// Controllers
const {
  getProducts,
  getAdminProducts,
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
  .route("/admin")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getAdminProducts);

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
