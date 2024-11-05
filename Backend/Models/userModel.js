import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true }, // Ensure googleId is optional and unique when set
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

// Fix the model definition to use mongoose.models
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
