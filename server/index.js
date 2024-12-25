import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

import { postLogin, postSignup } from "./controllers/user.js";

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

app.post('/signup' , postSignup);
app.post('/login' , postLogin);
app.get('/test', (req , res)=>{
  const token = req.headers.authorization;
  if(!token){
    res.json({message : "No token found" , status : 401})
  }
  const tokenValue = token.split(" ")[1];
  const decoded = jwt.verify(tokenValue , process.env.SECRET_KEY);
  if (!decoded){
    res.json({message : "Invalid token" , status : 401})
  }
  res.json({message : "Token is valid" , status : 200 , decoded : decoded
    })
})


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}✅`);
});
