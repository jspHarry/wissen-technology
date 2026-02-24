const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  seat: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat' },
  seatNumber: Number,
  date: String,
  status: { type: String, default: 'BOOKED' }
}, { timestamps: true });

bookingSchema.index({ seat:1, date:1 }, { unique:true });
bookingSchema.index({ employee:1, date:1 }, { unique:true });

module.exports = mongoose.model('Booking', bookingSchema);
