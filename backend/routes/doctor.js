import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// List all doctors for logged-in users
router.get("/", protect, async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
