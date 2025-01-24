"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
var logFormat = winston_1.default.format.printf(function (info) {
    var date = new Date().toISOString();
    return "".concat(date, " [").concat(info.level, "]: ").concat(info.message);
});
exports.logger = winston_1.default.createLogger({
    level: process.env.NODE_ENV !== "production" ? "debug" : "info",
    format: winston_1.default.format.combine(logFormat),
    transports: [new winston_1.default.transports.Console()],
});
//# sourceMappingURL=logger.js.map