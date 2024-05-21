// controllers/ticketController.js
const Ticket = require('../models/Ticket');

exports.registerTicket = async (req, res) => {
  const { fullName, email, numTickets, eventName } = req.body;

  if (!numTickets) {
    return res.status(400).json({ error: 'Number of tickets is required' });
  }

  try {
    const amount = numTickets * 10;

    // Create a new ticket instance
    const ticket = new Ticket({ fullName, email, numTickets, eventName, amount });

    // Save the ticket to the database
    await ticket.save();

    // Respond with success
    res.status(201).json({ message: 'Ticket registered successfully', ticket });
  } catch (error) {
    console.error('Error registering ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    await Ticket.findByIdAndDelete(id);
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
