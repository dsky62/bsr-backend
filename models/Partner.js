const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String, required: true }
});

module.exports = mongoose.model("Partner", PartnerSchema);

