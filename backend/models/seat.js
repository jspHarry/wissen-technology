const mongoose = require('mongoose');
const seatSchema = new mongoose.Schema({
  seatNumber: { type: Number, unique: true },
  type: { type: String, enum: ['RESERVED','FLOATER'], default: 'RESERVED' },
  isActive: { type: Boolean, default: true }
});
module.exports = mongoose.model('Seat', seatSchema);
