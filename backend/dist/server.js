"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: "50mb" }));
var API_VERSION = "/api";
var routes_1 = require("./routes");
app.use(API_VERSION, routes_1.routes); // localhost:8080/api
app.use(express_1.default.static("uploads"));
app.use(express_1.default.static("image"));
app.use(express_1.default.static("poses"));
app.use(express_1.default.static("model"));
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("Listening at http://localhost:".concat(PORT, "/"));
});
//# sourceMappingURL=server.js.map