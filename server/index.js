import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import {jwtVerifyMiddleware, checkRoleMiddleware} from "./middlewares/auth.js";
import { postLogin, postSignup } from "./controllers/user.js";
import { postProducts , getProducts} from "./controllers/product.js";
import { postOrder } from "./controllers/order.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000 || process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;


(async () => {
  const conn = await mongoose.connect(MONGO_URL);

  if (conn) {
    console.log("MongoDB connected ✅");
  }
})();

app.get("/health", (req, res) => {
  res.json("Server is running");
});
// auth api`s
app.post("/signup", postSignup);
app.post("/login", postLogin);

// product api`s
app.post("/products",jwtVerifyMiddleware , checkRoleMiddleware ,postProducts);
app.get("/products" , getProducts)

// orders api`s
app.post("/orders",jwtVerifyMiddleware ,postOrder);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}✅`);
});
