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
const fs = __importStar(require("fs"));
const convertVideoToFrames = () => {
    return new Promise((resolve, reject) => {
        const inputVideoPath = "encoded_output/output.mp4";
        const outputFramesPattern = "frames/frame_%d.png";
        // Create output folder if it doesn't exist
        if (!fs.existsSync("decoder/frames")) {
            fs.mkdirSync("decoder/frames");
        }
        ffmpeg(inputVideoPath)
            .on("filenames", (filenames) => {
            console.log(`Will generate ${filenames.length} frames`);
        })
            .on("end", () => {
            console.log("Finished generating frames");
            resolve(); // Resolve the promise when the process is complete
        })
            .on("error", (err) => {
            console.error(`Error: ${err.message}`);
            reject(err); // Reject the promise if there's an error
        })
            .outputOptions("-start_number", "0") // Set start_number to 0
            .output(outputFramesPattern)
            .run();
    });
};
exports.default = convertVideoToFrames;
//# sourceMappingURL=convertVideoToFrames.js.map