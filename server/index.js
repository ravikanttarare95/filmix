import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGODB_URL);
  if (connect) {
    console.log("\n📶 MongoDB connected");
  }
};

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is healthy" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n📞 Server is listening on ${PORT}`);
  connectDB();
});
