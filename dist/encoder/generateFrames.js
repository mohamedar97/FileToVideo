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
const fs = __importStar(require("fs"));
const canvas_1 = require("canvas");
const width = 1920;
const height = 1080;
const outputDir = "frames"; // Directory to save individual frames
const generateFrames = (binaryString, chunkCounter) => {
    const canvas = (0, canvas_1.createCanvas)(width, height);
    const ctx = canvas.getContext("2d");
    let i = 0;
    while (i < width * height) {
        const xCordinate = i % width;
        const yCordinate = Math.floor(i / width) % height;
        const frame = Math.floor(i / (width * height));
        binaryString[i] === "1"
            ? (ctx.fillStyle = "rgb(255,255,255)")
            : (ctx.fillStyle = "rgb(0,0,0)");
        ctx.fillRect(xCordinate, yCordinate, 1, 1);
        i++;
    }
    const outputFilePath = `${outputDir}/frame_${chunkCounter}.png`;
    fs.writeFileSync(outputFilePath, canvas.toBuffer());
    return binaryString.slice(width * height - binaryString.length);
};
exports.default = generateFrames;
//# sourceMappingURL=generateFrames.js.map