// imports ....
import express from "express";
import { loginUser, registerUser } from "../controller/userController.js";

// Router function...
const userRouter = express.Router();

// Routes ......
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
