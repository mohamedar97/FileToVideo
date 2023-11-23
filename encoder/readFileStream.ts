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
  filePath: string; // The path to the required file
  metaData: string; // The metaData (name,extension,length) of the file
  frameHeight: number; // Frame height of the resulting video
  frameWidth: number; // Frame width of the resulting video
}
const readFileStream = (options: Options) => {
  // Creates a read stream to the chosen file
  const readStream = fs.createReadStream(options.filePath, {
    highWaterMark: (options.frameHeight * options.frameWidth) / 8, // highWaterMark is the maximum size for the read buffer. Its value currently represents the number of bits to fill a single frame completely.
  });

  let remainingBits = options.metaData;
  // The remainingBits variable solves the problem that can't append the file meta data to the read buffer, so it adds those bits to the read chunk before sending it to the generateFrame Function. but a problem arises here. The generateFrames can only write a single frame, but this way, we send more bits than the function needs to draw a frame. in this case we send (data required to draw a frame + metadata) so we end up with an extra 1120 bits. Instead of discarding those bits we return them from the generateFrame function to be added to the next chunk until we get to the end of the data and everything is shifted by 1120 bits to accomodate the metadata.
  let chunkCounter = 0; // counts the number of chunks so far to write the frame name.

  readStream.on("data", (chunk: Buffer) => {
    // this event fire whenever the read buffer is full of data
    const binaryString = remainingBits + bufferToBinaryString(chunk); // This is the part where we append the remainig data to the chunk as explained earlier.
    remainingBits = generateFrames({
      frameWidth: options.frameWidth,
      frameHeight: options.frameHeight,
      binaryString,
      frameCounter: chunkCounter,
    }); // On the very first time this code runs, the remainingBits are the metaData, but after that it's the data remaining from each frame
    chunkCounter++; // Increases the counter to write the next frame
  });
};
export default readFileStream;
