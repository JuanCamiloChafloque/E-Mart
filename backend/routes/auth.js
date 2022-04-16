const express = require("express");
const router = express.Router();

// Controllers
const { register, login } = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
