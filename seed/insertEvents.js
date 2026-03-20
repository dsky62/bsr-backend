const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const Event = require("../models/Event");

mongoose.connect(process.env.MONGO_URI);

const events = [
  {
    title: "Spring Showcase",
    date: "2026-04-12",
    location: "Seattle, WA",
    description: "Elite spring basketball showcase event."
  },
  {
    title: "Summer Jam",
    date: "2026-07-20",
    location: "Portland, OR",
    description: "Top teams compete in the summer classic."
  }
];

async function seed() {
  await Event.deleteMany({});
  await Event.insertMany(events);
  console.log("Events inserted");
  mongoose.connection.close();
}

seed();

