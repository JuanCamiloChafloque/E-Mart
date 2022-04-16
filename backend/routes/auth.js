const express = require("express");
const router = express.Router();

// Controllers
const {
  register,
  login,
  logout,
  getCurrentUserProfile,
  updateCurrentUserPassword,
  updateCurrentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router
  .route("/me")
  .get(isAuthenticatedUser, getCurrentUserProfile)
  .put(isAuthenticatedUser, updateCurrentUser);
router
  .route("/me/password")
  .put(isAuthenticatedUser, updateCurrentUserPassword);
router.route("/logout").get(logout);
router.route("/forgotpassword").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
