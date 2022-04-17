const Order = require("../models/Order");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//@desc     Create new order
//@route    POST /api/v1/orders
//@access   private
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({ success: true, order: order });
});

//@desc     Get Single Order
//@route    GET /api/v1/orders/:id
//@access   private
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  res.status(200).json({ success: true, order: order });
});

//@desc     Get Single Order
//@route    GET /api/v1/orders/me
//@access   private
exports.getCurrentUserOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  if (!orders || orders.length === 0) {
    return next(
      new ErrorHandler(
        "There are no orders for the current logged in user",
        404
      )
    );
  }

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res
    .status(200)
    .json({ success: true, totalAmount: totalAmount, orders: orders });
});

//@desc     Get All Orders
//@route    GET /api/v1/orders
//@access   private/admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({});

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res
    .status(200)
    .json({ success: true, totalAmount: totalAmount, orders: orders });
});

//@desc     Update Order
//@route    GET /api/v1/orders/:id
//@access   private/admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("This order has been already delivered", 404));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({ success: true, message: "Order updated" });
});

//@desc     Delete a single order
//@route    DELETE /api/v1/orders/:id
//@access   private/admin
exports.deleteSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  await Order.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, message: "Order deleted" });
});

//----------------------------HELPER FUNCTIONS
async function updateStock(id, qty) {
  const product = await Product.findById(id);
  product.stock = product.stock - qty;
  await product.save({ validateBeforeSave: false });
}
