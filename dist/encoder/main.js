"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EncodedFileClass_1 = __importDefault(require("./EncodedFileClass"));
const framesToVideoConverter_1 = __importDefault(require("./framesToVideoConverter"));
const readFileStream_1 = __importDefault(require("./readFileStream"));
const encoder = (options) => {
    const fileToBeEncoded = new EncodedFileClass_1.default(options.filePath); // Creates an instance of the EncodedFile class containing all the info of the file to be encoded
    // The following function reads the file contents as a data stream and converts them to frames
    (0, readFileStream_1.default)({
        filePath: fileToBeEncoded.path,
        metaData: fileToBeEncoded.metaData,
        frameHeight: options.frameHeight,
        frameWidth: options.frameWidth,
    });
    // This function converts the frames to a video
    (0, framesToVideoConverter_1.default)();
};
exports.default = encoder;
//# sourceMappingURL=main.js.map