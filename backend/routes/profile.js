const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// @route GET /api/profile/me
// @desc Get current user's profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// @route PUT /api/profile
// @desc Update profile fields (setup / profile update)
// expects { name, bio, stylePreferences (array), avatarUrl }
router.put("/", auth, async (req, res) => {
  const { name, bio, stylePreferences, avatarUrl } = req.body;
  const update = {};
  if (name !== undefined) update.name = name;
  if (bio !== undefined) update.bio = bio;
  if (stylePreferences !== undefined)
    update.stylePreferences = stylePreferences;
  if (avatarUrl !== undefined) update.avatarUrl = avatarUrl;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: update },
      { new: true }
    ).select("-password -__v");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
