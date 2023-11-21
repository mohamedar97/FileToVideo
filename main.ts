import CustomFile from "./CustomFileClass";
import generateVideo from "./createVideo";

const main = async () => {
  const filePath = "test.pdf";
  const uploadedFile = new CustomFile(filePath);
  await uploadedFile.readFileData();
  generateVideo(uploadedFile);
};

main();
