const Terms = require("../models/Terms");

exports.getTerms = async (req, res) => {
  try {
    const terms = await Terms.findOne();
    if (!terms) {
      return res.status(404).json({ message: "Terms not found" });
    }
    res.json(terms);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

