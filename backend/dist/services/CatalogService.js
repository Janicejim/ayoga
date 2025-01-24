"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
var CatalogService = /** @class */ (function () {
    function CatalogService(knex) {
        this.knex = knex;
    }
    CatalogService.prototype.getClassMySearch = function (date, start_time, instructor, venue, title, type, yogaType, credit, language, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.knex
                            .select("class.id", "image", "venue", "class.name", "users.name as instructor", "class.type", "uuid as class_number", "credit", "language", "date", "end_time", "start_time", "class.capacity as capacity", this.knex.raw("coalesce((class.capacity - booked), class.capacity) as available"), "yoga.name as yoga_type")
                            .from("class")
                            .join("users", "users.id", "class.teacher_id")
                            .leftJoin(this.knex
                            .select(this.knex.raw("count(class_id) as booked"), "class_id")
                            .from("student_class")
                            .groupBy("class_id")
                            .as("class_info"), "class_info.class_id", "class.id")
                            .join(this.knex.select("id", "name").from("yoga_type").as("yoga"), "yoga.id", "class.yoga_type_id")
                            .where("class.date", ">", this.knex.raw("CURRENT_DATE"))
                            .andWhere(this.knex.raw("coalesce((class.capacity - booked), class.capacity) != 0"))
                            .andWhere("teacher_id", "!=", userId);
                        if (date && date !== "undefined") {
                            query.where("class.date", date);
                        }
                        if (start_time && start_time !== "undefined") {
                            query.where("class.start_time", start_time);
                        }
                        if (instructor && instructor !== "undefined") {
                            query.whereILike("users.name", "%".concat(instructor, "%"));
                        }
                        if (venue && venue !== "undefined") {
                            query.whereILike("class.venue", "%".concat(venue, "%"));
                        }
                        if (title && title !== "undefined") {
                            query.whereILike("class.name", "%".concat(title, "%"));
                        }
                        if (type && type !== "undefined" && type !== "all") {
                            query.where("type", type);
                        }
                        if (yogaType && yogaType !== "undefined" && yogaType !== "all") {
                            query.where("yoga.name", yogaType);
                        }
                        if (credit && credit !== 0) {
                            query.where("credit", "<", credit);
                        }
                        if (language && language !== "undefined" && language !== "all") {
                            query.where("language", language);
                        }
                        if (userId) {
                            query.whereNotIn("class.id", function () {
                                this.select("class_id as id")
                                    .from("student_class")
                                    .where("user_id", userId);
                            });
                        }
                        return [4 /*yield*/, query.orderBy("class.date", "desc")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CatalogService.prototype.getYogaType = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("yoga_type")
                            .select("id", "name")
                            .where("status", "active")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CatalogService;
}());
exports.CatalogService = CatalogService;
//# sourceMappingURL=CatalogService.js.map