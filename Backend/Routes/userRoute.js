import express from "express";
import passport from "passport";
import {
  loginUser,
  registerUser,
  createToken,
} from "../controller/userController.js";

const authRouter = express.Router();

authRouter.post("/sign_Up", registerUser);
authRouter.post("/login", loginUser);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  (req, res) => {
    if (req.user && req.user._id) {
      const token = createToken(req.user._id, req.user.name, req.user.email);
      res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
    } else {
      res.redirect("/login/failed");
    }
  }
);

authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({ error: true, message: "Login failure" });
});

authRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully logged in",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not authorized" });
  }
});

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

export default authRouter;
