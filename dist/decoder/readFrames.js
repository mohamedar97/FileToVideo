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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const canvas_1 = require("canvas");
const promises_1 = require("fs/promises");
const extractBinaryData_1 = __importDefault(require("./extractBinaryData"));
const readFrames = (options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const framesFolder = "frames"; // Location of the frames to be converted
    let firstFrame = true; // This is set to true only for the first frame to make sure the meta data is not taken into consideration as part of the file content when extractMetaDataOnly is false
    let writeStream;
    let fileLength;
    if (
    // Check to make sure the function is not in extract meta data mode and verifies all required inputs exist
    !options.extractMetaDataOnly &&
        options.decodedFile.videoFrameHeight &&
        options.decodedFile.videoFrameWidth) {
        fileLength = options.decodedFile.length;
        fs.writeFile(`output/${options.decodedFile.name}.${(_a = options.decodedFile) === null || _a === void 0 ? void 0 : _a.extension}`, "", () => { });
        writeStream = fs.createWriteStream(`output/${options.decodedFile.name}.${(_b = options.decodedFile) === null || _b === void 0 ? void 0 : _b.extension}`, {
            highWaterMark: options.decodedFile.videoFrameWidth *
                options.decodedFile.videoFrameHeight *
                4, // Makes the buffer equal to the data present in an entire frame. The 4 here is because each pixel contains four bits
        });
    }
    let frameBinaryData = ""; // The data to be extracted from the frame
    const numberOfFrames = options.extractMetaDataOnly // This gets the total number of frames to be converted. If extractMetaDataOnly is true, we only need the first frame of the video.
        ? 1
        : yield getNumberOfFrames(framesFolder);
    const framesPaths = []; // An array containing the path to all the frames to be converted
    for (let i = 0; i < numberOfFrames; i++) {
        // This for loop populates the framePaths array
        framesPaths.push(`${framesFolder}/frame_${i}.png`);
    }
    for (let i = 0; i < framesPaths.length; i++) {
        // The main for loop of the function responsible for going over every frame to extract its data
        try {
            const image = yield (0, canvas_1.loadImage)(framesPaths[i]); // Loads the image at the path
            // Canvas initialization
            const canvas = (0, canvas_1.createCanvas)(image.width, image.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixelData = imageData.data; // The variable containing all the pixel data
            // The extractBinaryData utility function converts the pixel data to binary. If extractMetaDataOnly is true, we only need the first 286 pixels. However 1152 is because each pixel is represented in 4 bits following each other
            frameBinaryData = options.extractMetaDataOnly
                ? (0, extractBinaryData_1.default)(pixelData.slice(0, 1152))
                : (0, extractBinaryData_1.default)(pixelData);
            // This expression makes sure to remove the meta data from the actual file content. If extractBinaryData is false and this is the first frame. It cuts the meta data bits from the binary
            frameBinaryData =
                firstFrame && !options.extractMetaDataOnly
                    ? frameBinaryData.slice(1152)
                    : frameBinaryData;
            if (!options.extractMetaDataOnly && fileLength > 0) {
                // This is the code section to write to the file which only needs to be executed if we're not trying to extract the meta data
                const binaryDataLength = frameBinaryData.length;
                const trimmedFrameBinaryData = frameBinaryData.slice(0, Math.min(binaryDataLength, fileLength));
                const binaryData = Uint8Array.from(trimmedFrameBinaryData
                    .match(/.{1,8}/g)
                    .map((byte) => parseInt(byte, 2))); // Converts the binay string to a binary array
                // Create a Buffer from the Uint8Array
                const buffer = Buffer.from(binaryData);
                writeStream.write(buffer);
                firstFrame = false; // Sets the firstFrame flag to false.
                fileLength = fileLength - binaryDataLength;
            }
        }
        catch (err) {
            console.error("Error reading image:", err);
            return ""; // or handle the error in a way that makes sense for your application
        }
    }
    if (options.extractMetaDataOnly) {
        return frameBinaryData; // Return the meta data if extractMetaDataOnly is true or an empty string if it's false
    }
    else {
        return "";
    }
});
const getNumberOfFrames = (folderPath) => __awaiter(void 0, void 0, void 0, function* () {
    // This function opens the frames folder to count the files in it and return the number of frames
    try {
        const files = yield (0, promises_1.readdir)(folderPath);
        const numberOfFiles = files.length;
        return numberOfFiles;
    }
    catch (err) {
        console.error("Error reading folder:", err);
    }
});
exports.default = readFrames;
//# sourceMappingURL=readFrames.js.map