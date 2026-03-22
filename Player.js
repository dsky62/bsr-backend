const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    team: { type: String },
    position: { type: String },
    height: { type: String },
    weight: { type: String },
    classYear: { type: String },

    bio: { type: String },
    strengths: { type: String },
    weaknesses: { type: String },
    scoutingNotes: { type: String },
    rankingsHistory: { type: String },
    stats: { type: String },

    photoUrl: { type: String },
    highlightVideoUrl: { type: String },

    twitter: { type: String },
    instagram: { type: String },
    hudl: { type: String },

    gpa: { type: String },
    academicNotes: { type: String },
    coachContact: { type: String },
    parentContact: { type: String },

    offers: { type: String },
    interests: { type: String },

    upcomingEvents: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);

