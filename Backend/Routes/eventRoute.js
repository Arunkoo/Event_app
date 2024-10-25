import express from "express";
import {
  addEvent,
  listEvent,
  removeEvent,
} from "../controller/eventController.js";
import multer from "multer";

// Intilization of router....
const eventRouter = express.Router();

// Images storage engine....
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // specify the directory where you want to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// allevent_router....
eventRouter.post("/add", upload.single("image"), addEvent);
eventRouter.get("/list", listEvent);
eventRouter.post("/remove", removeEvent);

export default eventRouter;
