// imports..
import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import dotenv from "dotenv";

dotenv.config();
// Creating a Token using JWT....
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
// Register User api ....
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // if the user already exist than
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "User  already exists.",
      });
    }

    // validating email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid email address!",
      });
    }
    // checking password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter a strong password with minimum 8 characters.",
      });
    }

    // Hashing user Passsword...
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user in user model....
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error." });
  }
};

//Login User api

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    // check if user exists...
    if (!user) {
      return res.json({ success: false, message: "user dosen't exist." });
    }
    // matching password...
    const isMatch = await bcrypt.compare(password, user.password);
    // check if matched ......or not marched
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials." });
    }

    // if all things are ok create token and return a res with token to fetch in frontend..
    const token = createToken(user._id);
    res.json({ success: true, token, message: "Logged in successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error!" });
  }
};

export { loginUser, registerUser };
