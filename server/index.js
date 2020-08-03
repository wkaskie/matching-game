const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3050;

// Middleware time! Used to serve the react app built files
app.use(express.static('build'));
app.use(express.static('public'));

const wsServer = new WebSocket.Server({ server });

// Game play variables
const clients = [];
const MAX_PLAYERS = 2;

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('connection', (socket, request) => {
  if (clients.length === MAX_PLAYERS) {
    socket.send('Too many players. Try again later');
    socket.close();
    return false;
  }

  const playerId = clients.length + 1;
  clients.push(playerId);

  socket.on('message', (message) => {
    console.log(`received: ${message}`);

    // Now broadcast this client's message to the rest of the world
    wsServer.clients.forEach((client) => {
      if (client != socket) { // Don't send to yourself
        client.send(message);
      }
    });
  });
  

  socket.on('open', () => {
    console.log('Opened');
  });

  socket.on('close', () => {
    // remove the player from the list
    const indx = clients.indexOf(playerId);
    clients.splice(indx, 1);
    console.log('We lost him!');
  });
  // Connection confirmation
  const confirmationData = JSON.stringify({playerId});
  socket.send(confirmationData);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = {app};
