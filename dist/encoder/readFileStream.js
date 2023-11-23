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
const framesToVideoConverter_1 = __importDefault(require("./framesToVideoConverter"));
const bufferToBinaryString = (buffer) => {
    let binaryString = "";
    for (let i = 0; i < buffer.length; i++) {
        const byteString = buffer[i].toString(2).padStart(8, "0");
        binaryString += byteString;
    }
    return binaryString;
};
const readFileStream = (options) => {
    // Creates a read stream to the chosen file
    const readStream = fs.createReadStream(options.filePath, {
        highWaterMark: (options.frameHeight * options.frameWidth) / 8, // highWaterMark is the maximum size for the read buffer. Its value currently represents the number of bits to fill a single frame completely.
    });
    let remainingBits = options.metaData;
    // The remainingBits variable solves the problem that can't append the file meta data to the read buffer, so it adds those bits to the read chunk before sending it to the generateFrame Function. but a problem arises here. The generateFrames can only write a single frame, but this way, we send more bits than the function needs to draw a frame. in this case we send (data required to draw a frame + metadata) so we end up with an extra 1120 bits. Instead of discarding those bits we return them from the generateFrame function to be added to the next chunk until we get to the end of the data and everything is shifted by 1120 bits to accomodate the metadata.
    let chunkCounter = 0; // counts the number of chunks so far to write the frame name.
    readStream.on("data", (chunk) => {
        // this event fire whenever the read buffer is full of data
        const binaryString = remainingBits + bufferToBinaryString(chunk); // This is the part where we append the remainig data to the chunk as explained earlier.
        remainingBits = (0, generateFrames_1.default)({
            frameWidth: options.frameWidth,
            frameHeight: options.frameHeight,
            binaryString,
            frameCounter: chunkCounter,
        }); // On the very first time this code runs, the remainingBits are the metaData, but after that it's the data remaining from each frame
        chunkCounter++; // Increases the counter to write the next frame
    });
    readStream.on("end", () => (0, framesToVideoConverter_1.default)() // This function converts the frames to a video.
    );
};
exports.default = readFileStream;
//# sourceMappingURL=readFileStream.js.map