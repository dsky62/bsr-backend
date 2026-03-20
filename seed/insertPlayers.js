const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const Player = require("../models/Player");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const players = [
  {
    name: "Demo Player",
    position: "PG",
    classYear: "2026",
    state: "WA",
    team: "Seattle Hoopers",
    rating: "⭐⭐⭐⭐",
    photo: ""
  },
  {
    name: "Jordan Miles",
    position: "SG",
    classYear: "2027",
    state: "CA",
    team: "LA Elite",
    rating: "⭐⭐⭐⭐⭐",
    photo: ""
  }
];

async function seed() {
  await Player.deleteMany({});
  await Player.insertMany(players);
  console.log("Players inserted");
  mongoose.connection.close();
}

seed();

