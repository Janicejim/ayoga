"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogRoutes = exports.catalogService = void 0;
var express_1 = __importDefault(require("express"));
var CatalogController_1 = require("../controllers/CatalogController");
var db_1 = __importDefault(require("../utils/db"));
var CatalogService_1 = require("../services/CatalogService");
exports.catalogService = new CatalogService_1.CatalogService(db_1.default);
var catalogController = new CatalogController_1.CatalogController(exports.catalogService);
exports.catalogRoutes = express_1.default.Router();
exports.catalogRoutes.get("/classes", catalogController.getClassMySearch);
exports.catalogRoutes.get("/yoga/type", catalogController.getYogaType);
//# sourceMappingURL=CatalogRoutes.js.map