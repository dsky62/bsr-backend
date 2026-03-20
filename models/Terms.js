const mongoose = require("mongoose");

const TermsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model("Terms", TermsSchema);

