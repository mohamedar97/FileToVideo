import DecodedFile from "./DecodedFileClass";
import readFrames from "./readFrames";
interface DecoderOptions {
  filePath: string;
  frameWidth: number;
  frameHeight: number;
}
const decoder = async (options: DecoderOptions) => {
  const extractedMetaData = await readFrames({
    extractMetaDataOnly: true,
  }); // Read frames takes two arguments that will be explained in the readFrames function, but this true is passed here to indicate that we only need to extract the file's meta data
  const extractedFile = new DecodedFile(
    extractedMetaData,
    options.frameHeight,
    options.frameWidth
  ); // Passes the extracted meta data to create a file class
  await readFrames({
    extractMetaDataOnly: false,
    decodedFile: extractedFile,
  }); // Passes false to indicate we don't need the meta data, and
};

export default decoder;
