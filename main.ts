import CustomFile from "./CustomFileClass";
import generateFrames from "./generateFrames";

const main = async () => {
  const filePath = "test.pdf";
  const uploadedFile = new CustomFile(filePath);
  await uploadedFile.readFileData();
  generateFrames(uploadedFile);
};

main();
