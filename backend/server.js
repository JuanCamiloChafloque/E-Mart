const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/database");

//Routes
const products = require("./routes/products.js");

//Middlewares
dotenv.config();
db();

const app = express();
const PORT = process.env.PORT || 5000;

//JSON Parser middleware
app.use(express.json());

//Routes Initialization
app.use("/api/v1/products", products);

//Port listener
app.listen(
  PORT,
  console.log(
    "Server running on " + process.env.NODE_ENV + " mode on port " + PORT
  )
);
