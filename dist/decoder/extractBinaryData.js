"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fourBitHashDecodingTable_1 = __importDefault(require("./fourBitHashDecodingTable"));
const extractBinaryData = (pixelData) => {
    let binaryData = "";
    for (let i = 0; i < pixelData.length; i += 4) {
        // Increments the loop by 4 because each 4 bits represent one pixel's rgba values
        const red = pixelData[i]; // First bit is red
        const green = pixelData[i + 1]; // Second bit is green
        const blue = pixelData[i + 2]; // Third bit is blue
        const key = `rgb(${red}, ${green}, ${blue})`;
        binaryData +=
            fourBitHashDecodingTable_1.default[key];
    } // Decodes the pixel value to its coresponding 4 bits value in the table
    return binaryData;
};
exports.default = extractBinaryData;
//# sourceMappingURL=extractBinaryData.js.map