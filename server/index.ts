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

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // on join game
  socket.on("join_game", async (message: any) => {
    console.log("user joined " + message.roomId);
    const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
    const rooms = Array.from(socket.rooms.values());
    const connectedRooms = rooms.filter((room) => room !== socket.id);

    // current socket is already connected to a room, so user cannot make or join another room
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

  socket.on("setup_game", async (message: any) => {
    console.log(message);
    const room = io.sockets.adapter.rooms.get(message.roomId);
    if (room?.size === 2) {
      socket.emit("start_game", { name: "You", character: message.character} );
      socket.to(message.roomId).emit("start_game", { name: "You", character: message.character });
    }
  })

  const getSocketGameRoom = (socket: Socket) => {
    const socketRooms = Array.from(socket.rooms.values()).filter((room) => room !== socket.id);
    const gameRoom = socketRooms && socketRooms[0];
    return gameRoom;
  }
  // on game update
  socket.on("update_game", async (board: any) => {
    const gameRoom = getSocketGameRoom(socket);
    socket.to(gameRoom).emit("on_game_update", board);
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