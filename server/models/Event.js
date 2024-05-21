// models/Event.js
const mongoose = require('mongoose');

// Define the schema for the Event entity
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  ChiefGuest: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Define the Event model based on the schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
