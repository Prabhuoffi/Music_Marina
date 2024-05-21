// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/register', ticketController.registerTicket);
router.get('/tickets', ticketController.getTickets);
router.delete('/tickets/:id', ticketController.deleteTicket);

module.exports = router;
