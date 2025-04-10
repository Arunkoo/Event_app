import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    cartData: {
      type: Map,
      of: Number, // Maps itemId to quantity
      default: {},
    },
    // streaks functionality.....
    streak: {
      current: { type: Number, default: 0 },
      lastActiveDate: { type: Date, default: null },
    },
    achievements: [
      {
        name: String,
        date: Date,
      },
    ],
  },
  { minimize: false }
);
// Add the streak method here, right before creating the model
userSchema.methods.updateStreak = function () {
  const today = new Date().setHours(0, 0, 0, 0);
  const lastActive = this.streak.lastActiveDate
    ? new Date(this.streak.lastActiveDate).setHours(0, 0, 0, 0)
    : null;

  // If last active was yesterday, increment streak
  if (lastActive === today - 86400000) {
    this.streak.current += 1;
  }
  // If not active today but not consecutive, reset
  else if (lastActive && lastActive !== today) {
    this.streak.current = 1;
  }
  // If first time or inactive before yesterday
  else if (!lastActive || lastActive < today - 86400000) {
    this.streak.current = 1;
  }
  // s
  else if (streak.current === 3) {
    user.achievements.push({ name: "3-Day Streak", date: new Date() });
  }

  this.streak.lastActiveDate = new Date();
  return this.save();
};
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
