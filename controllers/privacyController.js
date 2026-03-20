const Privacy = require("../models/Privacy");

exports.getPrivacy = async (req, res) => {
  try {
    const policy = await Privacy.findOne();
    if (!policy) {
      return res.status(404).json({ message: "Privacy policy not found" });
    }
    res.json(policy);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

