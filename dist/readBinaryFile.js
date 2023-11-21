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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBinaryFile = void 0;
const fs = __importStar(require("fs"));
const readBinaryFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                // Convert the Buffer to a string of binary
                const binaryString = bufferToBinaryString(data);
                resolve(binaryString);
            }
        });
    });
};
exports.readBinaryFile = readBinaryFile;
const bufferToBinaryString = (buffer) => {
    let binaryString = "";
    for (let i = 0; i < buffer.length; i++) {
        const byte = buffer[i];
        // Convert each byte to a binary string with leading zeros
        const byteString = byte.toString(2).padStart(8, "0");
        binaryString += byteString;
    }
    return binaryString;
};
//# sourceMappingURL=readBinaryFile.js.map