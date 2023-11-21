import DecodedFile from "./DecodedFileClass";
import readFrames from "./readFrames";
import binaryStringToFile from "./convertBinaryToFile";
interface DecoderOptions {
  filePath?: string;
}
const decoder = async (options: DecoderOptions) => {
  const extractedBinaryData = await readFrames();
  const extractedFile = new DecodedFile(extractedBinaryData);
  binaryStringToFile(
    extractedFile.content,
    `${options.filePath}${extractedFile.name}.${extractedFile.extension}`
  );
};

export default decoder;
