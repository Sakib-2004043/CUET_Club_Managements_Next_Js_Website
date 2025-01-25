const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  "Admin": { type: Number, default: 0 },
  "Computer Club": { type: Number, default: 0 },
  "Debating Society": { type: Number, default: 0 },
  "Green for Peace": { type: Number, default: 0 },
  "CUET Career Club": { type: Number, default: 0 },
  "Joyoddhoney": { type: Number, default: 0 },
  "CUETJA": { type: Number, default: 0 },
  "ASRRO": { type: Number, default: 0 },
  "CUET Photographic Society": { type: Number, default: 0 },
  "ACI-CUET Chapter": { type: Number, default: 0 },
  "Robo Mechatronics Association (RMA)": { type: Number, default: 0 },
  "Society of Petroleum Engineers (SPE)": { type: Number, default: 0 }
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
