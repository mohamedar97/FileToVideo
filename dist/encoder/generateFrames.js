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
const canvas_1 = require("canvas");
const fourBitHashEncodingTable_1 = __importDefault(require("./fourBitHashEncodingTable"));
const outputDir = "frames"; // Directory to save individual frames
const generateFrames = (options) => {
    // Initial frame configuration
    const canvas = (0, canvas_1.createCanvas)(options.frameWidth, options.frameHeight);
    const ctx = canvas.getContext("2d");
    let i = 0; // Current bit counter
    // This while loop goes over every bit in the binary string and writes it as a pixel in the frame
    while (i < options.frameWidth * options.frameHeight) {
        const xCordinate = i % options.frameWidth; // Calculates the postion of the pixel in a row mathematically
        const yCordinate = Math.floor(i / options.frameWidth) % options.frameHeight; // Calculates the postion of the pixel in a column mathematically
        // The previous two line are an alternative to having two nested for loops inside this while loop to place the pixels
        const hexChar = options.hexString[i];
        // This line assigns a pixel its value based on the current bit
        ctx.fillStyle =
            fourBitHashEncodingTable_1.default[hexChar];
        ctx.fillRect(xCordinate, yCordinate, 1, 1); // Draws a pixel on the frame
        i++; // Moves to the next bit
    }
    const outputFilePath = `${outputDir}/frame_${options.frameCounter}.png`; // Constructs the path for the resulting frame
    fs.writeFileSync(outputFilePath, canvas.toBuffer()); // Writes the resulting frame
    // Returns the remaining bits from every chunk as explained in the readFileStream file.
    return options.hexString.slice(options.frameWidth * options.frameHeight - options.hexString.length);
};
exports.default = generateFrames;
//# sourceMappingURL=generateFrames.js.map