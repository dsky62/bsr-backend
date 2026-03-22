const mongoose = require("mongoose");
require("dotenv").config();

const Privacy = require("./models/Privacy");
const Terms = require("./models/Terms");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("MongoDB connected");

    // Clear existing documents
    await Privacy.deleteMany({});
    await Terms.deleteMany({});

    // Insert Privacy Policy
    await Privacy.create({
      title: "Privacy Policy",
      content:
        "This is the official Privacy Policy for Brooks Scouting Report. We respect your privacy and protect your personal information. This policy explains what data we collect, how we use it, and how we safeguard it."
    });

    // Insert Terms of Service
    await Terms.create({
      title: "Terms of Service",
      content:
        "These are the official Terms of Service for Brooks Scouting Report. By using this website, you agree to follow all rules, guidelines, and policies outlined here."
    });

    console.log("Privacy + Terms seeded successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });

