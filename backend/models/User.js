const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  // profile fields for Setup page
  bio: { type: String, default: "" },
  stylePreferences: { type: [String], default: [] },
  avatarUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
