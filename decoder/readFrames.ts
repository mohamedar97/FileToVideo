import * as fs from "fs";
import { createCanvas, loadImage } from "canvas";
import { readdir } from "fs/promises";
import extractBinaryData from "./extractBinaryData";
import DecodedFile from "./DecodedFileClass";

interface Options {
  extractMetaDataOnly: boolean; // Set to true if you want to extract the meta data alone
  decodedFile?: DecodedFile; // The file to be decoded
}
const readFrames = async (options: Options) => {
  const framesFolder = "frames"; // Location of the frames to be converted
  let firstFrame = true; // This is set to true only for the first frame to make sure the meta data is not taken into consideration as part of the file content when extractMetaDataOnly is false
  let writeStream: fs.WriteStream | null;
  let fileLength: number;
  if (
    // Check to make sure the function is not in extract meta data mode and verifies all required inputs exist
    !options.extractMetaDataOnly &&
    options.decodedFile!.videoFrameHeight &&
    options.decodedFile!.videoFrameWidth
  ) {
    fileLength = options.decodedFile!.length;
    fs.writeFile(
      `output/${options.decodedFile!.name}.${options.decodedFile?.extension}`,
      "",
      () => {}
    );
    writeStream = fs.createWriteStream(
      `output/${options.decodedFile!.name}.${options.decodedFile?.extension}`,
      {
        highWaterMark:
          options.decodedFile!.videoFrameWidth! *
          options.decodedFile!.videoFrameHeight! *
          4, // Makes the buffer equal to the data present in an entire frame. The 4 here is because each pixel contains four bits
      }
    );
  }

  let frameBinaryData = ""; // The data to be extracted from the frame
  const numberOfFrames = options.extractMetaDataOnly // This gets the total number of frames to be converted. If extractMetaDataOnly is true, we only need the first frame of the video.
    ? 1
    : await getNumberOfFrames(framesFolder);
  const framesPaths = []; // An array containing the path to all the frames to be converted
  for (let i = 0; i < numberOfFrames!; i++) {
    // This for loop populates the framePaths array
    framesPaths.push(`${framesFolder}/frame_${i}.png`);
  }
  for (let i = 0; i < framesPaths.length!; i++) {
    // The main for loop of the function responsible for going over every frame to extract its data
    try {
      const image = await loadImage(framesPaths[i]); // Loads the image at the path
      // Canvas initialization
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data; // The variable containing all the pixel data

      // The extractBinaryData utility function converts the pixel data to binary. If extractMetaDataOnly is true, we only need the first 286 pixels. However 1152 is because each pixel is represented in 4 bits following each other
      frameBinaryData = options.extractMetaDataOnly
        ? extractBinaryData(pixelData.slice(0, 1152))
        : extractBinaryData(pixelData);
      // This expression makes sure to remove the meta data from the actual file content. If extractBinaryData is false and this is the first frame. It cuts the meta data bits from the binary
      frameBinaryData =
        firstFrame && !extractBinaryData
          ? frameBinaryData.slice(1152)
          : frameBinaryData;
      if (!options.extractMetaDataOnly && fileLength! > 0) {
        // This is the code section to write to the file which only needs to be executed if we're not trying to extract the meta data
        const binaryDataLength = frameBinaryData.length;
        const binaryData = Uint8Array.from(
          frameBinaryData.match(/.{1,8}/g)!.map((byte) => parseInt(byte, 2))
        ); // Converts the binay string to a binary array
        // Create a Buffer from the Uint8Array
        const buffer = Buffer.from(
          binaryData.slice(0, fileLength! % binaryDataLength)
        );
        writeStream!.write(buffer);
        firstFrame = false; // Sets the firstFrame flag to false.
        fileLength = fileLength! - binaryDataLength;
      }
    } catch (err) {
      console.error("Error reading image:", err);
      return ""; // or handle the error in a way that makes sense for your application
    }
  }
  if (options.extractMetaDataOnly) {
    return frameBinaryData; // Return the meta data if extractMetaDataOnly is true or an empty string if it's false
  } else {
    return "";
  }
};

const getNumberOfFrames = async (folderPath: string) => {
  // This function opens the frames folder to count the files in it and return the number of frames
  try {
    const files = await readdir(folderPath);
    const numberOfFiles = files.length;
    return numberOfFiles;
  } catch (err) {
    console.error("Error reading folder:", err);
  }
};
export default readFrames;
