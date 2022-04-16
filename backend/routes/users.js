const express = require("express");
const router = express.Router();

// Controllers
const {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
} = require("../controllers/usersController");

//Middlewares
const {
  isAuthenticatedUser,
  isAuthorizedRoles,
} = require("../middleware/auth");

router
  .route("/")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getAllUsers);

router
  .route("/:id")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, isAuthorizedRoles("admin"), updateSingleUser)
  .delete(isAuthenticatedUser, isAuthorizedRoles("admin"), deleteSingleUser);

module.exports = router;
