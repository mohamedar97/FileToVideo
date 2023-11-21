import EncodedFile from "./EncodedFileClass";
import DecodedFile from "./DecodedFileClass";
import generateFrames from "./generateFrames";
import readFrames from "./readFrames";
import binaryStringToFile from "./convertBinaryToFile";

const main = async () => {
  const filePath = "test.pdf";
  const uploadedFile = new EncodedFile(filePath);
  await uploadedFile.readFileData();
  generateFrames(uploadedFile);
  const extractedBinaryData = await readFrames();
  const extractedFile = new DecodedFile(extractedBinaryData);
  binaryStringToFile(
    extractedFile.content,
    `${extractedFile.name}.${extractedFile.extension}`
  );
};

main();
