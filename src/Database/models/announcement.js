const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  admin: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{ timestamps: true });

const announcement = mongoose.models.announcements || mongoose.model('announcements', announcementSchema);

module.exports = announcement;
