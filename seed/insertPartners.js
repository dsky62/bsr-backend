const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const Partner = require("../models/Partner");

mongoose.connect(process.env.MONGO_URI);

const partners = [
  { name: "Nike", website: "https://nike.com" },
  { name: "Gatorade", website: "https://gatorade.com" }
];

async function seed() {
  await Partner.deleteMany({});
  await Partner.insertMany(partners);
  console.log("Partners inserted");
  mongoose.connection.close();
}

seed();

