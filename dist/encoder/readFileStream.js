"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const generateFrames_1 = __importDefault(require("./generateFrames"));
const bufferToBinaryString = (buffer) => {
    let binaryString = "";
    for (let i = 0; i < buffer.length; i++) {
        const byteString = buffer[i].toString(2).padStart(8, "0");
        binaryString += byteString;
    }
    return binaryString;
};
const readFileStream = (options) => {
    const readStream = fs.createReadStream(options.filePath, {
        highWaterMark: (options.frameHeight * options.frameWidth) / 8,
    });
    let remainingBits = options.metaData;
    let chunkCounter = 0;
    readStream.on("data", (chunk) => {
        const binaryString = remainingBits + bufferToBinaryString(chunk);
        remainingBits = (0, generateFrames_1.default)(binaryString, chunkCounter);
        chunkCounter++;
    });
    readStream.on("end", () => {
        console.log("Conversion Done");
    });
};
exports.default = readFileStream;
//# sourceMappingURL=readFileStream.js.map