import EncodedFile from "./EncodedFileClass";
import generateFrames from "./generateFrames";

interface EncoderOptions {
  filePath: string;
}
const encoder = async (options: EncoderOptions) => {
  const uploadedFile = new EncodedFile(options.filePath);
  await uploadedFile.readFileData();
  generateFrames(uploadedFile);
};

export default encoder;
