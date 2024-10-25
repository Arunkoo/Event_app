// Our Main server file.....
// Imports...
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import eventRouter from "./Routes/eventRoute.js";

// configuration
dotenv.config();
// app Initialization
const app = express();

// connect to database...
connectDB();

// api endpoints...
app.use("/api/event", eventRouter);

const PORT = process.env.PORT;

// api's
app.get("/", (req, res) => {
  res.send("api is working");
});

// LISTNER to port
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
