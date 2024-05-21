// controllers/eventController.js
const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const { name, time, date, venue, description, ChiefGuest } = req.body;

    const newEvent = new Event({
      name,
      time,
      date,
      venue,
      ChiefGuest,
      description,
    });

    await newEvent.save();

    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'An error occurred while creating the event' });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'An error occurred while fetching the events' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'An error occurred while deleting the event' });
  }
};


module.exports = {
  createEvent,
  getEvents,
  deleteEvent,
};
