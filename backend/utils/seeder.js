const Product = require("../models/Product");
const dotenv = require("dotenv");
const database = require("../config/database");

const products = require("../data/products.json");

dotenv.config();
database();

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products initialized!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedProducts();
