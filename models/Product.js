import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Product = mongoose.model("Product", ProductSchema);
