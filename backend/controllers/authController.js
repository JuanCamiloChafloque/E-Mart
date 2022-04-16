const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

  sendToken(user, 201, res);
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

  sendToken(user, 200, res);
});

//@desc     Logout user
//@route    GET /api/v1/auth/logout
//@access   private
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ success: true, message: "Logged out" });
});

//@desc     Forgot Password
//@route    POST /api/v1/auth/forgotpassword
//@access   public
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Please enter your email address", 400));
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //Create reset password URL
  const resetURL =
    req.protocol +
    "://" +
    req.get("host") +
    "/api/v1/auth/password/reset/" +
    resetToken;

  const message =
    "Your password reset token is as follows: \n\n" +
    resetURL +
    "\n\nIf you have not requested this email, then ignore it.";

  try {
    await sendEmail({
      email: user.email,
      subject: "eMart Password Recovery",
      message: message,
    });

    res
      .status(200)
      .json({ success: true, message: "email sent to: " + user.email });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

//@desc     Reset Password
//@route    PUT /api/v1/auth/password/reset/:token
//@access   public
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log(resetTokenHash);

  const user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired.",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("New password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});
