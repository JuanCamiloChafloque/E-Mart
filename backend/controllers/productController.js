const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//@desc     Create new product
//@route    POST /api/v1/products
//@access   private/admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
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
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resultsPerPage);

  products = await apiFeatures.query.clone();
  res.status(200).json({
    success: true,
    productsCount: productCount,
    filteredProductsCount: filteredProductsCount,
    resPerPage: resultsPerPage,
    products: products,
  });
});

//@desc     Get all products for the admin page
//@route    GET /api/v1/products/admin
//@access   public
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    success: true,
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

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    let imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLink;
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

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, message: "Product deleted" });
});

//@desc     Create new review for product
//@route    PUT /api/v1/products/:id/review
//@access   private
exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment } = req.body;
  const { id } = req.params;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        (review.comment = comment), (review.rating = rating);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, message: "Product reviewed" });
});

//@desc     Get reviews for product
//@route    GET /api/v1/products/:id/review
//@access   private
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, reviews: product.reviews });
});

//@desc     Delete a review for a product
//@route    DELETE /api/v1/products/:id/review/:reviewId
//@access   private
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (r) => r._id.toString() !== req.params.reviewId.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await Product.findByIdAndUpdate(
    req.params.id,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res
    .status(200)
    .json({ success: true, message: "Review for product deleted" });
});
