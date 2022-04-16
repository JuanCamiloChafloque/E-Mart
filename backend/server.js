const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/database");
const errorMiddleware = require("./middleware/errors");

//Routes
const products = require("./routes/products");
const auth = require("./routes/auth");

//Middlewares
dotenv.config();
db();

const app = express();
const PORT = process.env.PORT || 5000;

//JSON Parser middleware
app.use(express.json());

//Routes Initialization
app.use("/api/v1/products", products);
app.use("/api/v1/auth", auth);

//Error middleware
app.use(errorMiddleware);

//Port listener
const server = app.listen(
  PORT,
  console.log(
    "Server running on " + process.env.NODE_ENV + " mode on port " + PORT
  )
);

//Error handling for shutting down the server
process.on("uncaughtException", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down server due to uncaught rejection ");
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down server due to unhandled promise rejection ");
  server.close(() => {
    process.exit(1);
  });
});
