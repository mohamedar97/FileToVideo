import * as fs from "fs";

export const readBinaryFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        // Convert the Buffer to a string of binary
        const binaryString = bufferToBinaryString(data);
        resolve(binaryString);
      }
    });
  });
};

const bufferToBinaryString = (buffer: Buffer): string => {
  let binaryString = "";

  for (let i = 0; i < buffer.length; i++) {
    const byte = buffer[i];
    // Convert each byte to a binary string with leading zeros
    const byteString = byte.toString(2).padStart(8, "0");

    binaryString += byteString;
  }
  return binaryString;
};
