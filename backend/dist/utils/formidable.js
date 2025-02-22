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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageInS3 = exports.createFormidableS3Form = exports.createFormidableLocalForm = void 0;
var formidable_1 = __importDefault(require("formidable"));
var fs_1 = __importDefault(require("fs"));
var uploadDir = "uploads";
fs_1.default.mkdirSync(uploadDir, { recursive: true });
var counter = 0;
function createFormidableLocalForm() {
    return (0, formidable_1.default)({
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
}
exports.createFormidableLocalForm = createFormidableLocalForm;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var dotenv_1 = __importDefault(require("dotenv"));
var stream_1 = __importDefault(require("stream"));
dotenv_1.default.config();
var credentials = new aws_sdk_1.default.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID + "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY + "",
});
var s3 = new aws_sdk_1.default.S3({
    credentials: credentials,
    region: process.env.S3_REGION,
});
var filename = "";
function createFormidableS3Form() {
    return (0, formidable_1.default)({
        fileWriteStreamHandler: function () {
            var passThroughStream = new stream_1.default.PassThrough();
            var upload = s3.upload({
                Body: passThroughStream,
                Bucket: process.env.S3_BUCKET_NAME,
                Key: filename,
                ContentType: "image/jpg, image/png, image/jpeg",
            }, {});
            upload.send();
            return passThroughStream;
        },
        filename: function (originalName, originalExt, part, form) {
            var _a;
            counter++;
            var fieldName = part.name;
            var timestamp = Date.now();
            var ext = (_a = part.mimetype) === null || _a === void 0 ? void 0 : _a.split("/").pop();
            filename = "".concat(fieldName, "-").concat(timestamp, "-").concat(counter, ".").concat(ext);
            return filename;
        },
    });
}
exports.createFormidableS3Form = createFormidableS3Form;
function deleteImageInS3(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var params, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: filename,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, s3.deleteObject(params).promise()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("Error deleting image ".concat(filename, ":"), err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteImageInS3 = deleteImageInS3;
//# sourceMappingURL=formidable.js.map