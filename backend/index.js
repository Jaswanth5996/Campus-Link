const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const userRoutes=require('./routes/userRoutes')
const notesRoutes=require('./routes/noteRoutes')
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('./uploads'));
app.use('/api/users', (req, res, next) => {
  console.log("Hit /api/users route");
  next();
}, userRoutes);
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} ${process.env.JWT_SECRET}`));
