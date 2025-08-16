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
const discussion=require('./routes/postdiscussion');
const Physio = require('./models/Physio');
const PhyDetail = require('./models/PhyDetail');

connectDB();    

const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000','https://campus-link-kappa.vercel.app'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
  
});


app.use(cors({
  origin: ['https://campus-link-kappa.vercel.app','http://localhost:3000'],
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

app.use('/discussion',discussion );

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('new-post', (data) => {
    socket.broadcast.emit('new-post-received', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get('api/physio/', async (req, res) => {
  try {
    const physios = await Physio.find().sort({ createdAt: -1 });
    res.json(physios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('api/physio/:id', async (req, res) => {
  try {
    const physio = await Physio.findById(req.params.id);
    if (!physio) return res.status(404).json({ message: 'Not found' });

    const details = await PhyDetail.findOne({ postId: req.params.id });

    res.json({
      postId: physio, 
      condition: details?.condition || '',
      pt_manage: details?.pt_manage || ''
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/',(req,res)=>{
  res.send("server running ! use the api")
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT} ${process.env.JWT_SECRET}`));
