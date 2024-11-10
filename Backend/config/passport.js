import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../Models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/user/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find a user by email first
        let user = await userModel.findOne({ email: profile.emails[0].value });

        if (user) {
          // If user exists, update googleId and any other info you need to update
          user.googleId = profile.id; // Add or update the Google ID
          user.name = profile.displayName || user.name; // Optionally update the name

          // Save updated user
          await user.save();
        } else {
          // If no user found, create a new user
          user = new userModel({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
