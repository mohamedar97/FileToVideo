"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EncodedFileClass_1 = __importDefault(require("./EncodedFileClass"));
const framesToVideoConverter_1 = __importDefault(require("./framesToVideoConverter"));
const readFileStream_1 = __importDefault(require("./readFileStream"));
const encoder = (options) => {
    const uploadedFile = new EncodedFileClass_1.default(options.filePath);
    (0, readFileStream_1.default)({
        filePath: uploadedFile.path,
        metaData: uploadedFile.metaData,
        frameHeight: options.frameHeight,
        frameWidth: options.frameWidth,
    });
    (0, framesToVideoConverter_1.default)();
};
exports.default = encoder;
//# sourceMappingURL=main.js.map