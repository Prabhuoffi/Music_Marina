// routes/eventRoutes.js
const express = require('express');
const { createEvent, getEvents, deleteEvent } = require('../controllers/eventController');

const router = express.Router();

router.post('/create', createEvent);
router.get('/', getEvents);
router.delete('/:id', deleteEvent);



module.exports = router;
