const mongoose = require("mongoose");

const postAdShema = new mongoose.Schema({
  title: {
    type: String
  },
  price: {
    type: Number
  },
  message: {
    type: String
  },
  firstName: {
    type: String
  },
  address: {
    type: String
  },
  category: {
    type: String
  },
  country: {
    type: String
  },
  brand: {
    type: String
  },
  condition: {
    type: String
  },
  quantity: {
    type: Number,
    default: 1
  },
  images: [String]
},
  { timestamps: true }
);

module.exports = mongoose.model("PostAd", postAdShema);
