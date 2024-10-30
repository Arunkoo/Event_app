import eventModel from "../Models/eventModel.js";
import fs from "fs";

// Create Operation
const addEvent = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }

    const image_filename = req.file.filename;

    // Create the new event with provided data
    const event = new eventModel({
      title: req.body.title,
      image: image_filename,
      venue: req.body.venue,
      description: req.body.description,
      Date: req.body.Date,
      category: req.body.category,
      price: req.body.price,
    });

    await event.save();
    res.json({ success: true, message: "Event Added" });
  } catch (error) {
    console.error("Error while adding event:", error);
    res.json({ success: false, message: "Error while adding event" });
  }
};

// Read opertaion....
const listEvent = async (req, res) => {
  try {
    const event = await eventModel.find({});
    res.json({ success: true, data: event });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Could not fetch data" });
  }
};

// Delete Operation....
const removeEvent = async (req, res) => {
  try {
    const event = await eventModel.findById(req.body.id);
    fs.unlink(`uploads/${event.image}`, () => {});

    await eventModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "event Removed!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while removing event" });
  }
};

export { addEvent, listEvent, removeEvent };
