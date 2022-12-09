const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/useRoutes.js');
const messagesRoutes = require('./routes/messagesRoute.js');
const http = require('http');
const socket = require('socket.io');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/messages', messagesRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection success full');
  })
  .catch((err) => {
    console.log(`Can't connect to database`, err);
  });

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket)
      socket.to(sendUserSocket).emit('msg-receive', data.message);
  });
});
