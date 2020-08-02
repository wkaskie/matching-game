import express from "express";
import * as http from "http";
import * as WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const port = 3050;

const wsServer = new WebSocket.Server({ server });

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

wsServer.on("connection", (socket: WebSocket) => {
  socket.on("message", (message: string) => {
    console.log(`received: ${message}`);

    wsServer.clients.forEach((client) => {
      if (client != socket) {
        socket.send(`Hello, ${message}`);
      }
    });
  });

  socket.send("Thanks for connecting");
});

wsServer.on("request", function (request) {
  console.log("REQUEST MADE");
  
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
