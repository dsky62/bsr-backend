const News = require("../models/News");

// GET all news
exports.getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single news item
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "Not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE news
exports.createNews = async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE news
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE news
exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

