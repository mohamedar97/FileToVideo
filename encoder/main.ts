import EncodedFile from "./EncodedFileClass";
import framesToVideoConverter from "./framesToVideoConverter";
import readFileStream from "./readFileStream";

interface EncoderOptions {
  filePath: string;
  frameWidth: number;
  frameHeight: number;
}
const encoder = (options: EncoderOptions) => {
  const uploadedFile = new EncodedFile(options.filePath);
  readFileStream({
    filePath: uploadedFile.path,
    metaData: uploadedFile.metaData,
    frameHeight: options.frameHeight,
    frameWidth: options.frameWidth,
  });
  framesToVideoConverter();
};

export default encoder;
