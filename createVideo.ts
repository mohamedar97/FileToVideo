import * as fs from "fs";
import { createCanvas, CanvasRenderingContext2D } from "canvas";
import * as ffmpegStatic from "ffmpeg-static";
import { spawn } from "child_process";
import CustomFile from "./CustomFileClass";

const width = 1920;
const height = 1080;
const framesPerSecond = 30;
const outputDir = "frames"; // Directory to save individual frames

const generateVideo = (binaryFile: CustomFile) => {
  const numberOfBits = binaryFile.completeFileLength;
  const file = binaryFile.completeFile;
  let frameCount = 0;
  let i = 0;
  while (i < numberOfBits) {
    const canvas = createCanvas(width, height);
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    for (let j = 0; j < width * height; j++) {
      const xCordinate = i % width;
      const yCordinate = Math.floor(i / width) % height;
      file[i] === "1"
        ? (ctx.fillStyle = "rgb(255,255,255)")
        : (ctx.fillStyle = "rgb(0,0,0)");

      ctx.fillRect(xCordinate, yCordinate, 1, 1);
      i++;
    }
    const outputFilePath = `${outputDir}/frame_${frameCount}.png`;
    fs.writeFileSync(outputFilePath, canvas.toBuffer());
    frameCount++;
  }
};

export default generateVideo;
