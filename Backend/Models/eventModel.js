import mongoose from "mongoose";

// schema....

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  venue: { type: String, required: true },
  description: { type: String, required: true },
  Date: { type: Date, default: Date.now, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
});

// model...
const eventModel = mongoose.model.fest || mongoose.model("fest", eventSchema);

export default eventModel;
