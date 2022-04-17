const express = require("express");
const router = express.Router();

// Controllers
const {
  createOrder,
  getSingleOrder,
  getCurrentUserOrders,
  getAllOrders,
  updateOrder,
  deleteSingleOrder,
} = require("../controllers/orderController");
const {
  isAuthenticatedUser,
  isAuthorizedRoles,
} = require("../middleware/auth");

router
  .route("/")
  .post(isAuthenticatedUser, createOrder)
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getAllOrders);

router.route("/me").get(isAuthenticatedUser, getCurrentUserOrders);

router
  .route("/:id")
  .get(isAuthenticatedUser, getSingleOrder)
  .put(isAuthenticatedUser, isAuthorizedRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, isAuthorizedRoles("admin"), deleteSingleOrder);

module.exports = router;
