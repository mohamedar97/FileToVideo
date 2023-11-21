import { createCanvas, loadImage } from "canvas";
import { readdir } from "fs/promises";

const framesFolder = "frames";
const readFrames = async () => {
  let totalBinaryData = "";
  const numberOfFrames = await getNumberOfFrames(framesFolder);
  const framesPaths = [];
  for (let i = 0; i < numberOfFrames!; i++) {
    framesPaths.push(`${framesFolder}/frame_${i}.png`);
  }
  for (let i = 0; i < numberOfFrames!; i++) {
    try {
      const image = await loadImage(framesPaths[i]);
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data;
      // Use the utility function to process pixel data
      const frameBinaryData = extractBinaryData(pixelData);
      totalBinaryData = totalBinaryData + frameBinaryData;
    } catch (err) {
      console.error("Error reading image:", err);
      return ""; // or handle the error in a way that makes sense for your application
    }
  }
  return totalBinaryData;
};

const extractBinaryData = (pixelData: Uint8ClampedArray): string => {
  let binaryData = "";
  for (let i = 0; i < pixelData.length; i += 4) {
    const red = pixelData[i];
    const green = pixelData[i + 1];
    const blue = pixelData[i + 2];

    if (red > 100 && green > 100 && blue > 100) {
      binaryData += "1";
    } else {
      binaryData += "0";
    }
  }
  return binaryData;
};

const getNumberOfFrames = async (folderPath: string) => {
  try {
    const files = await readdir(folderPath);
    const numberOfFiles = files.length;
    return numberOfFiles;
  } catch (err) {
    console.error("Error reading folder:", err);
  }
};
export default readFrames;
