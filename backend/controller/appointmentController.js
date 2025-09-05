import Appointment from "../models/Appointment.js";

export const getAppointments = async (req, res) => {
  try {
    let appointments;

    if (req.user.role === "patient") {
      // patient sees only their appointments
      appointments = await Appointment.find({ patient: req.user._id })
        .populate("doctor", "name email specialization")
        .populate("patient", "name email");
    } else if (req.user.role === "doctor") {
      // doctor sees only their appointments
      appointments = await Appointment.find({ doctor: req.user._id })
        .populate("doctor", "name email specialization")
        .populate("patient", "name email");
    } else {
      // admin or other roles can see all appointments
      appointments = await Appointment.find()
        .populate("doctor", "name email specialization")
        .populate("patient", "name email");
    }

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
