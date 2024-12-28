const mongoose = require("mongoose");

// Define the schema
const requestSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    requestedClub: {
      type: String,
      required: true,
    },
    approval: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define a unique compound index for `studentId` and `requestedClub`
requestSchema.index({ studentId: 1, requestedClub: 1 }, { unique: true });

// Create or retrieve the model
const requestTable = mongoose.models.Requests || mongoose.model("Requests", requestSchema);

module.exports = requestTable;
