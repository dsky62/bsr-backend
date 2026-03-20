const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const Team = require("../models/Team");

mongoose.connect(process.env.MONGO_URI);

const teams = [
  { name: "Seattle Hoopers", city: "Seattle", state: "WA" },
  { name: "LA Elite", city: "Los Angeles", state: "CA" }
];

async function seed() {
  await Team.deleteMany({});
  await Team.insertMany(teams);
  console.log("Teams inserted");
  mongoose.connection.close();
}

seed();

