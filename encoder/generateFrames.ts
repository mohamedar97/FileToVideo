import * as fs from "fs";
import { createCanvas, CanvasRenderingContext2D } from "canvas";
import EncodedFile from "./EncodedFileClass";

const width = 1920;
const height = 1080;
const outputDir = "frames"; // Directory to save individual frames

const generateFrames = (binaryString: string, chunkCounter: number) => {
  const canvas = createCanvas(width, height);
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

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

export default generateFrames;
