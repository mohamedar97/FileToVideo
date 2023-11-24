"use strict";
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
const canvas_1 = require("canvas");
const promises_1 = require("fs/promises");
const fourBitHashDecodingTable_1 = __importDefault(require("./fourBitHashDecodingTable"));
const framesFolder = "frames";
const readFrames = () => __awaiter(void 0, void 0, void 0, function* () {
    let totalBinaryData = "";
    const numberOfFrames = yield getNumberOfFrames(framesFolder);
    const framesPaths = [];
    for (let i = 0; i < numberOfFrames; i++) {
        framesPaths.push(`${framesFolder}/frame_${i}.png`);
    }
    for (let i = 0; i < numberOfFrames; i++) {
        try {
            const image = yield (0, canvas_1.loadImage)(framesPaths[i]);
            const canvas = (0, canvas_1.createCanvas)(image.width, image.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixelData = imageData.data;
            // Use the utility function to process pixel data
            const frameBinaryData = extractBinaryData(pixelData);
            totalBinaryData = totalBinaryData + frameBinaryData;
        }
        catch (err) {
            console.error("Error reading image:", err);
            return ""; // or handle the error in a way that makes sense for your application
        }
    }
    return totalBinaryData;
});
const extractBinaryData = (pixelData) => {
    let binaryData = "";
    for (let i = 0; i < pixelData.length; i += 4) {
        const red = pixelData[i];
        const green = pixelData[i + 1];
        const blue = pixelData[i + 2];
        const key = `rgb(${red}, ${green}, ${blue})`;
        binaryData +=
            fourBitHashDecodingTable_1.default[key];
    }
    return binaryData;
};
const getNumberOfFrames = (folderPath) => __awaiter(void 0, void 0, void 0, function* () {
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