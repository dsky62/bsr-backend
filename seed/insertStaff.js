const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const Staff = require("../models/Staff");

mongoose.connect(process.env.MONGO_URI);

const staff = [
  { name: "John Brooks", role: "Founder" },
  { name: "Sarah Lee", role: "Director of Scouting" }
];

async function seed() {
  await Staff.deleteMany({});
  await Staff.insertMany(staff);
  console.log("Staff inserted");
  mongoose.connection.close();
}

seed();

