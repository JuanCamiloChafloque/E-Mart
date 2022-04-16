const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//@desc     Register user
//@route    POST /api/v1/auth/register
//@access   public
exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "url",
      url: "url",
    },
  });

  res.status(201).json({ success: true, user: user });
});
