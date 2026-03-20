const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const Camp = require("../models/Camp");

mongoose.connect(process.env.MONGO_URI);

const camps = [
  {
    name: "Elite Guard Camp",
    date: "2026-06-15",
    location: "Seattle, WA",
    description: "Training for elite guards."
  },
  {
    name: "Big Man Academy",
    date: "2026-08-01",
    location: "Tacoma, WA",
    description: "Development for forwards and centers."
  }
];

async function seed() {
  await Camp.deleteMany({});
  await Camp.insertMany(camps);
  console.log("Camps inserted");
  mongoose.connection.close();
}

seed();

