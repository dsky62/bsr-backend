const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const Ranking = require("../models/Ranking");
const Player = require("../models/Player");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

async function seed() {
  await Ranking.deleteMany({});

  // Fetch players so we can use their IDs
  const players = await Player.find({});
  if (players.length === 0) {
    console.log("No players found. Seed players first.");
    mongoose.connection.close();
    return;
  }

  const demoPlayer = players.find(p => p.name === "Demo Player");
  const jordanMiles = players.find(p => p.name === "Jordan Miles");

  const rankings = [
    {
      playerId: jordanMiles?._id,
      name: "Jordan Miles",
      rank: 1,
      position: "SG",
      classYear: 2027,
      state: "CA",
      team: "LA Elite",
      photo: ""
    },
    {
      playerId: demoPlayer?._id,
      name: "Demo Player",
      rank: 2,
      position: "PG",
      classYear: 2026,
      state: "WA",
      team: "Seattle Hoopers",
      photo: ""
    }
  ];

  await Ranking.insertMany(rankings);
  console.log("Rankings inserted");
  mongoose.connection.close();
}

seed();

