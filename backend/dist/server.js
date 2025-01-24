"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// import http from "http";
var express_1 = __importDefault(require("express"));
// import { Server as SocketIO } from "socket.io";
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
// const expressServer = new http.Server(app);
// const io = new SocketIO(expressServer, { cors: { origin: true } });
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: "50mb" }));
var API_VERSION = "/api";
var routes_1 = require("./routes");
app.use(API_VERSION, routes_1.routes); // localhost:8080/api
app.use("/assets", express_1.default.static("assets"));
app.use(express_1.default.static("uploads"));
app.use(express_1.default.static("image"));
var PORT = process.env.PORT || 8080;
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
app.listen(PORT, function () {
    console.log("Listening at http://localhost:".concat(PORT, "/"));
});
//# sourceMappingURL=server.js.map