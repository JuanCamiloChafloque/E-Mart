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

  const token = user.getJwtToken();

  res.status(201).json({ success: true, token: token });
});

//@desc     Login user
//@route    POST /api/v1/auth/login
//@access   public
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password are entered
  if (!email || !password) {
    next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email: email not found", 401));
  }

  //Checks for password
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Incorrect password.", 401));
  }

  const token = user.getJwtToken();
  res.status(200).json({ success: true, token: token });
});
