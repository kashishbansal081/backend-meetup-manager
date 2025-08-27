const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  photo: { type: String },
});

const locationSchema = new mongoose.Schema({
  venue: String,
  address: String,
  city: String,
});

const eventSchema = new mongoose.Schema(
  {
    eventTitle: { type: String, required: true },
    hostedBy: { type: String, required: true },
    eventType: { type: String, enum: ["Online", "Offline"], required: true },
    eventImages: { type: [String], default: [] },
    eventDescription: String,
    eventStartTime: { type: Date, required: true },
    eventEndTime: { type: Date, required: true },
    eventLocation: locationSchema,
    eventPrice: Number,
    eventDressCode: String,
    eventAgeRestriction: Number,
    eventTags: [String],
    speakers: [speakerSchema], // This can hold 0, 1, or many speakers
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
