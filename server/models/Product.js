import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },
    currentPrice: {
      type: Number,
    },
    category: {
      type: String,
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);
const Product = model("Product", productSchema);

export default Product;
