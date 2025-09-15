import express from "express";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Book appointment
router.post("/", protect, async (req, res) => {

  //only patient can book
    if (req.user.role !== "patient") {
    return res.status(403).json({ message: "Only patients can book appointments" });}
  try {
    const { doctorId, when, reason } = req.body;
    if (!doctorId || !when)
      return res.status(400).json({ message: "doctorId and when are required" });

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor")
      return res.status(400).json({ message: "Invalid Doctor" });

    const appt = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      when: new Date(when),
      reason: reason || "",
    });

    res.status(201).json(appt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List appointments (doctor sees theirs, patient sees theirs)
router.get("/", protect, async (req, res) => {
  const { role, _id } = req.user;
  let filter = {};

  if (role === "doctor") filter = { doctor: _id };
  else if (role === "patient") filter = { patient: _id };

  try {
    const appts = await Appointment.find(filter)
      .populate("patient", "name email specialization")
      .populate("doctor", "name email specialization")
      .sort({ when: 1 });

    res.json(appts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel appointment
router.delete("/:id", protect, async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: "Not Found" });

    if (
      appt.patient.toString() !== req.user._id.toString() &&
      appt.doctor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not Allowed" });
    }

    appt.status = "cancelled";
    await appt.save();
    res.json({ message: "Cancelled", appt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
