"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("./decoder/main"));
// The entry point for the program. Uncomment the part the you wish to use
const frameWidth = 1920;
const frameHeight = 1080;
// // // The encoder takes a file, reads its data, converts it to frames, then converts those frames to a video file
// encoder({
//   filePath: "Anaconda3-2022-05-MacOSX-arm64.pkg",
//   frameHeight,
//   frameWidth,
// });
// The decoder takes a video, converts it to frames, then takes those frames, extracts their binary data and converts them to their original file formate
(0, main_1.default)({ filePath: "./output/" });
//# sourceMappingURL=main.js.map