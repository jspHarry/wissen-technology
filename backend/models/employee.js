const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  batch: { type: Number, default: 1 },
  role: { type: String, default: 'EMPLOYEE' },
  status: { type: String, default: 'ACTIVE' }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
