const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const mediaRoutes = require("./routes/mediaRoutes");
const newsRoutes = require("./routes/newsRoutes");
const playerRoutes = require("./routes/playerRoutes");
const teamRoutes = require("./routes/teamRoutes");
const rankingRoutes = require("./routes/rankingRoutes");
const eventRoutes = require("./routes/eventRoutes");
const faqRoutes = require("./routes/faqRoutes");
const testimonialRoutes = require("./routes/testimonialsRoutes");
const staffRoutes = require("./routes/staffRoutes");
const coachRoutes = require("./routes/coachesRoutes");
const campRoutes = require("./routes/campsRoutes");
const partnerRoutes = require("./routes/partnersRoutes");
const authRoutes = require("./routes/authRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const privacyRoutes = require("./routes/privacyRoutes");
const termsRoutes = require("./routes/termsRoutes");

// Register routes
app.use("/api/media", mediaRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/rankings", rankingRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/coaches", coachRoutes);
app.use("/api/camps", campRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/privacy", privacyRoutes);
app.use("/api/terms", termsRoutes);

// Health check endpoint (for Vercel)
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Start server (for local development)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export app for Vercel Serverless Functions
module.exports = app;