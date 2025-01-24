"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.form = void 0;
var formidable_1 = __importDefault(require("formidable"));
var fs_1 = __importDefault(require("fs"));
var uploadDir = "uploads";
fs_1.default.mkdirSync(uploadDir, { recursive: true });
var counter = 0;
exports.form = (0, formidable_1.default)({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * 1024,
    filter: function (part) { var _a; return ((_a = part.mimetype) === null || _a === void 0 ? void 0 : _a.startsWith("image/")) || false; },
    filename: function (originalName, originalExt, part, form) {
        var _a;
        var fieldName = part.name;
        var timestamp = Date.now();
        var ext = (_a = part.mimetype) === null || _a === void 0 ? void 0 : _a.split("/").pop();
        counter++;
        return "".concat(fieldName, "-").concat(timestamp, "-").concat(counter, ".").concat(ext);
    },
});
//# sourceMappingURL=formidable.js.map