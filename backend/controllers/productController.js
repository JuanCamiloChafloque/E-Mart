const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//@desc     Create new product
//@route    POST /api/v1/products
//@access   private/admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product: product,
  });
});

//@desc     Get all products
//@route    GET /api/v1/products?keyword=
//@access   public
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resultsPerPage = 4;
  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find({}), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    productCount: productCount,
    products: products,
  });
});

//@desc     Get single product details
//@route    GET /api/v1/products/:id
//@access   public
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product: product });
});

//@desc     Update single product
//@route    PUT /api/v1/products/:id
//@access   private/admin
exports.updateSingleProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, product: product });
});

//@desc     Delete single product
//@route    DELETE /api/v1/products/:id
//@access   private/admin
exports.deleteSingleProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, message: "Product deleted" });
});
