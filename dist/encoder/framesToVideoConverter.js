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
const ffmpeg = require("fluent-ffmpeg");
const glob = __importStar(require("glob"));
const framesToVideoConverter = () => {
    // Set the path to the FFmpeg binary
    ffmpeg.setFfmpegPath("/opt/homebrew/bin/ffmpeg");
    // Input images path and output video path
    const imagesPath = "frames/*.png"; // Path to images
    const outputVideoPath = "output.mp4"; // Output video path
    // Get a list of input image files
    const imageFiles = glob.sync(imagesPath);
    // Convert images to video
    ffmpeg()
        .input(`concat:${imageFiles.join("|")}`)
        .inputFormat("image2pipe")
        .inputFPS(1) // Frames per second
        .output(outputVideoPath)
        .on("end", () => {
        console.log("Conversion finished.");
    })
        .on("error", (err) => {
        console.error("Error:", err);
    })
        .run();
};
exports.default = framesToVideoConverter;
//# sourceMappingURL=framesToVideoConverter.js.map