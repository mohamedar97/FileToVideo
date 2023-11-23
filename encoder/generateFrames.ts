import * as fs from "fs";
import { createCanvas, CanvasRenderingContext2D } from "canvas";

interface Options {
  frameWidth: number; // Frame width of the resulting frame
  frameHeight: number; // Frame height of the resulting frame
  binaryString: string; // The binary to be converted to a string
  frameCounter: number; // The number of the current frame
}

const outputDir = "frames"; // Directory to save individual frames

const generateFrames = (options: Options) => {
  // Initial frame configuration
  const canvas = createCanvas(options.frameWidth, options.frameHeight);
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

  let i = 0; // Current bit counter
  // This while loop goes over every bit in the binary string and writes it as a pixel in the frame
  while (i < options.frameWidth * options.frameHeight) {
    const xCordinate = i % options.frameWidth; // Calculates the postion of the pixel in a row mathematically
    const yCordinate = Math.floor(i / options.frameWidth) % options.frameHeight; // Calculates the postion of the pixel in a column mathematically
    // The previous two line are an alternative to having two nested for loops inside this while loop to place the pixels

    // This line assigns a pixel its value based on the current bit
    options.binaryString[i] === "1"
      ? (ctx.fillStyle = "rgb(255,255,255)")
      : (ctx.fillStyle = "rgb(0,0,0)");

    ctx.fillRect(xCordinate, yCordinate, 1, 1); // Draws a pixel on the frame
    i++; // Moves to the next bit
  }
  const outputFilePath = `${outputDir}/frame_${options.frameCounter}.png`; // Constructs the path for the resulting frame
  fs.writeFileSync(outputFilePath, canvas.toBuffer()); // Writes the resulting frame

  // Returns the remaining bits from every chunk as explained in the readFileStream file.
  return options.binaryString.slice(
    options.frameWidth * options.frameHeight - options.binaryString.length
  );
};

export default generateFrames;
