"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = __importDefault(require("express"));
var AuthRoutes_1 = require("./routers/AuthRoutes");
var UserInfoRoutes_1 = require("./routers/UserInfoRoutes");
var ClassRoutes_1 = require("./routers/ClassRoutes");
var guard_1 = require("./utils/guard");
var TransactionRoutes_1 = require("./routers/TransactionRoutes");
var CatalogRoutes_1 = require("./routers/CatalogRoutes");
var PosesRoutes_1 = require("./routers/PosesRoutes");
var PackageRoutes_1 = require("./routers/PackageRoutes");
var TeacherRoutes_1 = require("./routers/TeacherRoutes");
var AdminRoutes_1 = require("./routers/AdminRoutes");
exports.routes = express_1.default.Router();
exports.routes.use("/poses", PosesRoutes_1.posesRoutes);
exports.routes.use("/auth", AuthRoutes_1.authRoutes);
exports.routes.use("/user", guard_1.isLoggedInAPI, UserInfoRoutes_1.userInfoRoutes);
exports.routes.use("/class", ClassRoutes_1.classRoutes);
exports.routes.use("/transaction", guard_1.isLoggedInAPI, TransactionRoutes_1.transactionInfoRoutes);
exports.routes.use("/catalog", CatalogRoutes_1.catalogRoutes);
exports.routes.use("/payment", guard_1.isLoggedInAPI, PackageRoutes_1.packageRoutes);
exports.routes.use(TeacherRoutes_1.teacherRoutes);
exports.routes.use("/admin", guard_1.isAdminAPI, AdminRoutes_1.adminRoutes);
//# sourceMappingURL=routes.js.map