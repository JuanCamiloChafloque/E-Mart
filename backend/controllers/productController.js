const mongoose = require("mongoose");
const Product = require("../models/Product");

//@desc     Create new product
//@route    POST /api/v1/products
//@access   private
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product: product,
  });
};

//@desc     Get all products
//@route    GET /api/v1/products
//@access   public
exports.getProducts = async (req, res, next) => {
  const products = await Product.find({});
  res
    .status(200)
    .json({ success: true, count: products.length, products: products });
};

//@desc     Get single product details
//@route    GET /api/v1/products/:id
//@access   public
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  res.status(200).json({ success: true, product: product });
};

//@desc     Update single product
//@route    PUT /api/v1/products/:id
//@access   private
exports.updateSingleProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, product: product });
};

//@desc     Delete single product
//@route    DELETE /api/v1/products/:id
//@access   private
exports.deleteSingleProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, message: "Product deleted" });
};
