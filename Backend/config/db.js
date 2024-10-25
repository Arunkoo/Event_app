import mongoose from "mongoose";
import dotenv from "dotenv";

// config..
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Correct option
      useUnifiedTopology: true, // Correct option
    });
    console.log("Database connected!");
  } catch (err) {
    console.log("Database connection error:", err);
    process.exit(1);
  }
};
