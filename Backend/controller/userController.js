// imports..

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { configDotenv } from "dotenv";
import userModel from "../Models/userModel.js";

configDotenv();
// Creating a Token using JWT....

const createToken = (id, name, profileImage) => {
  return jwt.sign({ id, name, profileImage }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Register User api ....
// authController.js

// Register User API
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  // Your existing code for registration...

  // Create a token for the user after saving to the database
  const token = createToken(user._id);

  // Return success, token, and user details
  res.json({
    success: true,
    token,
    user: {
      name: user.name,
      email: user.email,
      profileImage: user.profileImage || null,
    }, // Include user data
    message: "Account created successfully.",
  });
};

// Login User API
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Your existing code for login...

  const token = createToken(user._id);

  // Return success, token, and user details
  res.json({
    success: true,
    token,
    user: {
      name: user.name,
      email: user.email,
      profileImage: user.profileImage || null,
    }, // Include user data
    message: "Logged in successfully!",
  });
};

export { loginUser, registerUser, createToken };
