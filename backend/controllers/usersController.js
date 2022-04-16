const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//@desc     Get all users
//@route    GET /api/v1/users
//@access   private/admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ success: true, count: users.length, users: users });
});

//@desc     Get single user profile
//@route    GET /api/v1/users/:id
//@access   private/admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User profile not found", 400));
  }

  res.status(200).json({ success: true, user: user });
});

//@desc     Update single user profile
//@route    PUT /api/v1/users/:id
//@access   private/admin
exports.updateSingleUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  //TODO: Avatar

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, user: user });
});

//@desc     Delete user
//@route    DELETE /api/v1/users/:id
//@access   private/admin
exports.deleteSingleUser = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  await User.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, message: "User deleted" });
});
