import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { configDotenv } from "dotenv";
import userModel from "../Models/userModel.js";

configDotenv();

// Creating a Token using JWT
const createToken = (id, name, profileImage) => {
  const token = jwt.sign({ id, name, profileImage }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log("Generated Token:", token); // Log the token for debugging
  return token;
};

// Register User API
const registerUser = async (req, res) => {
  const { name, email, password, googleId } = req.body; // Include googleId if available

  // Step 1: Validate inputs
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format." });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long.",
    });
  }

  // Step 2: Check if user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists!" });
  }

  // Step 3: Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Step 4: Create and save the new user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      googleId: googleId || null, // Only set googleId if it's provided
    });

    await user.save();

    // Step 5: Create JWT token
    const token = createToken(user._id, user.name, user.email);

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || null,
      },
      message: "Account created successfully.",
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res
      .status(500)
      .json({ success: false, message: `Server error: ${err.message}` });
  }
};

// Login User API
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  // Validate password (assumes password is hashed in DB)
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  }

  // Create JWT token
  const token = createToken(user._id, user.name, user.profileImage);

  // Respond with token and user details
  res.json({
    success: true,
    token,
    user: {
      name: user.name,
      email: user.email,
      profileImage: user.profileImage || null,
    },
    message: "Logged in successfully!",
  });
};

export { loginUser, registerUser, createToken };
