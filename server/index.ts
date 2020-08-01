import express from "express";
import * as http from "http";
import * as WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const port = 3050;

const wsServer = new WebSocket.Server({ server });
wsServer.on("connection", (socket: WebSocket) => {
  socket.on("message", (message: string) => {
    console.log(`received: ${message}`);

    const broadcastRegex = /^broadcast\:/;

    if (broadcastRegex.test(message)) {
      message = message.replace(broadcastRegex, "");
      wsServer.clients.forEach((client) => {
        if (client != socket) {
          client.send(`Hello, broadcast message -> ${message}`);
        }
      });
    } else {
      socket.send("Thank you for sending " + message);
    }
  });
  socket.send("Thanks for connecting");
});
// I'm maintaining all active connections in this object
const clients: {
  [key: string]: string;
} = {};

// This code generates unique userid for everyuser.
const getUniqueID = (): string => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

wsServer.on("request", function (request) {
  var userID = getUniqueID();
  console.log(
    new Date() +
      " Recieved a new connection from origin " +
      request.origin +
      "."
  );
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(
    "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
  );
});

app.get("/", (req, res) => {
  res.send("yes or no");
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
// server.on('upgrade', (request, socket, head) => {
//     wsServer.handleUpgrade(request, socket, head, socket => {
//       wsServer.emit('connection', socket, request);
//     });
//   });
