import EncodedFile from "./EncodedFileClass";
import framesToVideoConverter from "./framesToVideoConverter";
import readFileStream from "./readFileStream";

// The entry point to the encoder program

interface EncoderOptions {
  filePath: string; // Path to the file that will be encoded
  frameWidth: number; // Frame width of the resulting video
  frameHeight: number; // Frame height of the resulting video
}
const encoder = (options: EncoderOptions) => {
  const fileToBeEncoded = new EncodedFile(options.filePath); // Creates an instance of the EncodedFile class containing all the info of the file to be encoded

  // The following function reads the file contents as a data stream and converts them to frames
  readFileStream({
    filePath: fileToBeEncoded.path,
    metaData: fileToBeEncoded.metaData,
    frameHeight: options.frameHeight,
    frameWidth: options.frameWidth,
  });
};

export default encoder;
