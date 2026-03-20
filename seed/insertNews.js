const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const News = require("../models/News");

mongoose.connect(process.env.MONGO_URI);

const news = [
  {
    title: "BSR Launches New Platform",
    content: "The new Brooks Scouting Report platform is now live.",
    author: "Admin",
    date: "2026-02-27",
    image: ""
  },
  {
    title: "Top Prospects Emerging",
    content: "Several new prospects are rising in the rankings.",
    author: "Staff Writer",
    date: "2026-02-20",
    image: ""
  }
];

async function seed() {
  await News.deleteMany({});
  await News.insertMany(news);
  console.log("News inserted");
  mongoose.connection.close();
}

seed();

