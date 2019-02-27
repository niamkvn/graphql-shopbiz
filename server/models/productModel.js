const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: String,
  imgUrl: String,
  categories: [{ categoryID: String }]
});

module.exports = mongoose.model("Product", productSchema);
