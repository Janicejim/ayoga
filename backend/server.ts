import dotenv from "dotenv";
dotenv.config();
// import http from "http";

import express from "express";
// import { Server as SocketIO } from "socket.io";

import cors from "cors";

const app = express();
// const expressServer = new http.Server(app);
// const io = new SocketIO(expressServer, { cors: { origin: true } });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
const API_VERSION = "/api";
import { routes } from "./routes";

app.use(API_VERSION, routes); // localhost:8080/api
app.use("/assets", express.static("assets"));
app.use(express.static("uploads"));
app.use(express.static("image"));

const PORT = process.env.PORT || 8080;

// --------------------Socket IO SetUp Start-------------------------
// io.on("connection", (socket) => {
//   socket.on(
//     "roomOnly",
//     (data: {
//       content: string;
//       chatroom_id: number;
//       name: number;
//       icon: string;
//       updated_at: string;
//       sender_id: number;
//     }) => {
//       io.to(`Room-${data.chatroom_id}`).emit("roomOnlyMessage", data);
//     }
//   );

//   // Event 2, join room
//   socket.on("joinRoom", (room) => {
//     socket.join(`Room-${room}`);
//   });

//   // Event 3, leave rooms before disconnect
//   socket.on("disConnection", (data: { roomIdList: number[]; user: string }) => {
//     data.roomIdList.map((value) => {
//       socket.leave(`${value}`);
//     });

//     socket.emit("disConnection", "disconnected");
//   });
// });
// __________________________________Socket IO SetUp END__________________________________

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
