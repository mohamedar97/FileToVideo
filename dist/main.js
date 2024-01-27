"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("./encoder/main"));
// #############################################
// The encoder works perfectly, however the decoder isn't working properly. Mainly because the conversion from video to frames isn't functioning as expected. The extracted pictures from the video aren't similar to the original ones.
// #############################################
// The entry point for the program. Uncomment the part the you wish to use
const frameWidth = 1920;
const frameHeight = 1080;
// The encoder takes a file, reads its data, converts it to frames, then converts those frames to a video file
(0, main_1.default)({
    filePath: "test.pdf",
    frameHeight,
    frameWidth,
});
// The decoder takes a video, converts it to frames, then takes those frames, extracts their binary data and converts them to their original file formate
// decoder({ filePath: "./output/", frameWidth, frameHeight });
//# sourceMappingURL=main.js.map