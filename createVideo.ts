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
  const numberOfFrames = Math.ceil(numberOfBits / (width * height));
  const frames = [createCanvas(width, height)];
  for (let i = 0; i < numberOfFrames - 1; i++) {
    frames.push(createCanvas(width, height));
  }
  let i = 0;
  while (i < numberOfBits) {
    const xCordinate = i % width;
    const yCordinate = Math.floor(i / width) % height;
    const frame = Math.floor(i / (width * height));
    const ctx: CanvasRenderingContext2D = frames[frame].getContext("2d")!;
    file[i] === "1"
      ? (ctx.fillStyle = "rgb(255,255,255)")
      : (ctx.fillStyle = "rgb(0,0,0)");

    ctx.fillRect(xCordinate, yCordinate, 1, 1);
    i++;
  }
  for (let i = 0; i < numberOfFrames; i++) {
    const outputFilePath = `${outputDir}/frame_${i}.png`;
    fs.writeFileSync(outputFilePath, frames[i].toBuffer());
  }
};

export default generateVideo;
