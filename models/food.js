const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image_1: {
    type: String,
    required: true,
  },
  image_2: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
