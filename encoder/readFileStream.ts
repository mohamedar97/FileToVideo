import * as fs from "fs";
import generateFrames from "./generateFrames";

const bufferToBinaryString = (buffer: Buffer): string => {
  let binaryString = "";
  for (let i = 0; i < buffer.length; i++) {
    const byteString = buffer[i].toString(2).padStart(8, "0");
    binaryString += byteString;
  }
  return binaryString;
};

interface Options {
  filePath: string;
  metaData: string;
  frameHeight: number;
  frameWidth: number;
}
const readFileStream = (options: Options) => {
  const readStream = fs.createReadStream(options.filePath, {
    highWaterMark: (options.frameHeight * options.frameWidth) / 8,
  });
  let remainingBits = options.metaData;
  let chunkCounter = 0;

  readStream.on("data", (chunk: Buffer) => {
    const binaryString = remainingBits + bufferToBinaryString(chunk);
    remainingBits = generateFrames(binaryString, chunkCounter);
    chunkCounter++;
  });
  readStream.on("end", () => {
    console.log("Conversion Done");
  });
};
export default readFileStream;
