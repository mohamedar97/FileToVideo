import CustomFile from "./CustomFileClass";

const main = async () => {
  const filePath = "test.pdf";
  const uploadedFile = new CustomFile(filePath);
  await uploadedFile.readFileData();
};

main();
