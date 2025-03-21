"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var knexConfig = require("../knexfile");
var knex = (0, knex_1.default)(knexConfig[process.env.NODE_ENV || "development"]);
exports.default = knex;
//# sourceMappingURL=db.js.map