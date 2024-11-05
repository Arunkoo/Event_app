// Our Main server file.....
// Imports...
import express from "express";
import { configDotenv } from "dotenv";
import { connectDB } from "./config/db.js";
import eventRouter from "./Routes/eventRoute.js";
import cors from "cors";
import "./config/passport.js";
import session from "express-session";
import passport from "passport";
import authRouter from "./Routes/userRoute.js";

// configuration
configDotenv();
// app Initialization
const app = express();

// connect to database...
connectDB();

// Middleware...
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, headers, etc.)
  })
);

app.use(express.json());

// Auth configurations....
app.use(
  session({
    secret: "b8f4e1a3c9e0123f1d3f4d5e6c7b8f9e", // Your session secret
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Set cookie expiration (1 day)
      secure: false, // Set to true for HTTPS (ensure your server uses HTTPS)
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// API endpoints...
app.use("/api/event", eventRouter);
app.use("/api/user", authRouter);
app.use("/images", express.static("uploads"));

// Default route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Listener to port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
