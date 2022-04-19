const express = require("express");
const router = express.Router();

// Controllers
const {
  processPayment,
  sendStripeApi,
} = require("../controllers/paymentController");

const { isAuthenticatedUser } = require("../middleware/auth");

router
  .route("/")
  .post(isAuthenticatedUser, processPayment)
  .get(isAuthenticatedUser, sendStripeApi);

module.exports = router;
