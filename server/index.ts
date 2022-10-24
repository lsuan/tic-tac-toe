import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import { Socket, Server } from "socket.io";

dotenv.config({path: "../.env"});
const port = process.env.PORT;

const io = new Server(Number(port), {
  cors: {
    origin: "*"
  }
});

const socket = Socket;

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  socket.on("join_game", async (message: any) => {
    const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
    const rooms = Array.from(socket.rooms.values());
    const connectedRooms = rooms.filter((room) => room !== socket.id);

    if (connectedRooms.length > 0 || connectedSockets && connectedSockets.size === 2 ) {
      socket.emit("room_join_error", {
        error: "Room is full."
      });
    } else {
      await socket.join(message.roomId);
      socket.emit("room_joined");
      // socket.leave() use this for when user leaves the room (aka when they press quit)
    }
  });
});

// io.listen(Number(port));

// const app: Express = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server, { cors: {origin: "*"} });

// app.use(express.json());
// app.use(cors());

// app.get('/', (req: Request, res: Response) => {
//   res.send('<h1>Hello World From the Typescript Server!</h1>');
// });

// server.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });



// io.on("connection", (socket: any) => {
//   console.log("User connected: " + socket.id);
// })