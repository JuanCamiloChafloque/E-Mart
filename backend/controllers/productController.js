const mongoose = require("mongoose");

exports.getProducts = (req, res, next) => {
  res.status(200).json({ message: "success" });
};
