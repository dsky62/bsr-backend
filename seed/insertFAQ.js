const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const FAQ = require("../models/FAQ");

mongoose.connect(process.env.MONGO_URI);

const faqs = [
  { question: "What is BSR?", answer: "Brooks Scouting Report is a basketball scouting platform." },
  { question: "How do I get ranked?", answer: "Players are evaluated by our scouting team." }
];

async function seed() {
  await FAQ.deleteMany({});
  await FAQ.insertMany(faqs);
  console.log("FAQ inserted");
  mongoose.connection.close();
}

seed();

