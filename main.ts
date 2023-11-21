import CustomFile from "./CustomFileClass";
import generateFrames from "./generateFrames";
import readFrames from "./readFrames";

const main = async () => {
  const filePath = "test.pdf";
  const uploadedFile = new CustomFile(filePath);
  await uploadedFile.readFileData();
  // generateFrames(uploadedFile);
  const extractedFile = await readFrames();
};

main();
