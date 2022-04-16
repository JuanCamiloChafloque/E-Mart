const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./config/database");

//Routes

//Middlewares
dotenv.config();
db();

const app = express();
const PORT = process.env.PORT || 5000;

//JSON Parser middleware
app.use(express.json());

//Routes Initialization

//Port listener
app.listen(
  PORT,
  console.log(
    "Server running on " + process.env.NODE_ENV + " mode on port " + PORT
  )
);
