// backend/models/emailModel.js
const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  fullName: String,
  lastName: String,
  email: String,
  sendTo: String,
  subject: String,
  description: String,
  sentAt: { type: Date, default: Date.now }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
