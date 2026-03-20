const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const Coach = require("../models/Coach");

mongoose.connect(process.env.MONGO_URI);

const coaches = [
  { name: "Coach Williams", team: "Seattle Hoopers", role: "Head Coach" },
  { name: "Coach Ramirez", team: "LA Elite", role: "Assistant Coach" }
];

async function seed() {
  await Coach.deleteMany({});
  await Coach.insertMany(coaches);
  console.log("Coaches inserted");
  mongoose.connection.close();
}

seed();

