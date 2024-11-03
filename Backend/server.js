// Our Main server file.....
// Imports...
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import eventRouter from "./Routes/eventRoute.js";
import cors from "cors";
import userRouter from "./Routes/userRoute.js";

// configuration
dotenv.config();
// app Initialization
const app = express();

// middleware...
app.use(cors());
app.use(express.json());
// connect to database...
connectDB();

// api endpoints...
app.use("/api/event", eventRouter);
app.use("/api/user", userRouter);
app.use("/images", express.static("uploads"));

const PORT = process.env.PORT;

// api's
app.get("/", (req, res) => {
  res.send("api is working");
});

// LISTNER to port
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
