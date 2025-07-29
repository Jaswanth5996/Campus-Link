const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
dotenv.config();
const userRoutes = require('./routes/userRoutes');
const notesRoutes = require('./routes/noteRoutes');
const connectDB = require('./config/db');
const postsRoutes = require('./routes/posts');
connectDB();    

const app = express();



const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
  
});


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('./uploads'));
app.use('/api/users', (req, res, next) => {
  console.log("Hit /api/users route");
  next();
}, userRoutes);
app.use('/api/notes', notesRoutes);

app.use('/events', postsRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('new-post', (data) => {
    socket.broadcast.emit('new-post-received', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT} ${process.env.JWT_SECRET}`));
