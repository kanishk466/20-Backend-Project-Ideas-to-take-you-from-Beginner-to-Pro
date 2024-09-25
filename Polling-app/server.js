import express from 'express';
import { createServer } from 'node:http';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});



// Poll data (This will be updated in real-time)
let pollData = {
    optionA: 0,
    optionB: 0,
    optionC: 0,
  };
  
  // Socket.io connection
  io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Send current poll data to newly connected user
    socket.emit('pollData', pollData);
  
    // Receive vote from the client
    socket.on('vote', (option) => {
      if (pollData[option] !== undefined) {
        pollData[option]++;
      }
  
      // Broadcast updated poll data to all connected clients
      io.emit('pollData', pollData);
    });
  
    // Handle user disconnecting
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });



server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});