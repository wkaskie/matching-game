import express from 'express';
import * as  http from 'http';
import * as WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const port = 3050;

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new WebSocket.Server({ server });
wsServer.on('connection', (socket: WebSocket) => {
  socket.on('message', (message: string) => {
      console.log(`received: ${message}`);

      const broadcastRegex = /^broadcast\:/;
    
      if (broadcastRegex.test(message)) {

        message = message.replace(broadcastRegex, '');
        wsServer.clients
            .forEach(client => {
                if (client != socket) {
                    client.send(`Hello, broadcast message -> ${message}`);
                }
            })
      } else {
        socket.send('Thank you for sending ' + message);
      }
  });
  socket.send('Thanks for connecting');
});


app.get('/', (req, res) => {
    res.send( 'yes or no');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
// server.on('upgrade', (request, socket, head) => {
//     wsServer.handleUpgrade(request, socket, head, socket => {
//       wsServer.emit('connection', socket, request);
//     });
//   });
