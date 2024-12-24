import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

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

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}✅`);
});
