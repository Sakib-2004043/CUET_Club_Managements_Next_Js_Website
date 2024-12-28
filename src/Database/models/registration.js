const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    unique: true,
    required: true 
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  hall: {
    type: String,
    required: true,
  },
  clubsMember:[{
    type: String,
    default:""
  }],
  admin:{
    type: String,
    default: "NO",
  },
  clubsModerator:[{
    type: String,
    default:""
  }],
  profileImage: {
    type: Buffer, 
    default: null
  }
},{ timestamps: true });

const userRegs = mongoose.models.userRegistrations || mongoose.model('userRegistrations', userSchema);

module.exports = userRegs;
