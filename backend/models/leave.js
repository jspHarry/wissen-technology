const mongoose = require('mongoose');
const leaveSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  startDate: String,
  endDate: String,
  reason: String
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
