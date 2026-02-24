const express = require("express");
const router = express.Router();
const { getWeekOfMonth, isWorkingDay } = require("../utils/dateUtils");
const SeatBooking = require("../models/booking");
const Employee = require("../models/employee");

// GET Dashboard Data
router.get("/", async (req, res) => {
  try {
    // Must come from auth middleware
    const employeeId = req.user?.id;
    if (!employeeId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Get selected date from query
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ msg: "Date query parameter is required" });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    const selectedDate = new Date(date);
    const dateString = selectedDate.toDateString();

    // Calculate week (1–7 week1, 8–14 week2 etc.)
    const week = getWeekOfMonth(selectedDate);

    // Detect working day based on batch + selected date
    const working = isWorkingDay(employee.batch, selectedDate);

    // Check if employee already has booking
    const existingBooking = await SeatBooking.findOne({
      employeeId,
      date: dateString,
      status: "BOOKED"
    });

    // Count floater bookings for that date
    const floaterCount = await SeatBooking.countDocuments({
      date: dateString,
      seatType: "FLOATER",
      status: "BOOKED"
    });

    res.json({
      date,
      week,
      batch: employee.batch,
      isWorkingDay: working,
      seatStatus: existingBooking ? existingBooking.seatType : null,
      remainingFloaterSeats: 10 - floaterCount
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

module.exports = router;