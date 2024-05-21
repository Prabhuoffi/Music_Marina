const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const ticketRoutes = require('./Routes/ticketRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to database
connectDatabase();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
