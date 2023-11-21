import { readBinaryFile } from "./readBinaryFile.js";

class CustomFile {
  // Properties
  path: string;
  content: string;
  name: string;
  extension: string;
  length: number;
  nameBinary: string;
  extensionBinary: string;
  lengthBinary: string;
  metaData: string;
  completeFile: string;

  // Constructor
  constructor(path: string) {
    this.path = path;
    this.name = this.path.split(".")[0];
    this.extension = this.path.split(".")[1];
    this.content = "";
    this.length = 0;
    this.nameBinary = this.convertToBinary(this.name, 1024);
    this.extensionBinary = this.convertToBinary(this.extension, 64);
    this.lengthBinary = "";
    this.metaData = "";
    this.completeFile = "";
  }

  public async readFileData(): Promise<void> {
    try {
      const binaryData = await readBinaryFile(this.path);
      this.content = binaryData;
      this.length = this.content.length;
      this.lengthBinary = this.convertToBinary(this.length.toString(), 32);
      this.metaData =
        this.nameBinary + this.extensionBinary + this.lengthBinary;
      this.completeFile = this.metaData + this.content;
    } catch (error) {
      console.error("Error reading file:", error);
      throw error; // Re-throw the error if needed
    }
  }

  private convertToBinary(text: string, minLength: number): string {
    let binaryString = "";
    for (let i = 0; i < text.length; i++) {
      const binaryChar = text.charCodeAt(i).toString(2);
      binaryString += binaryChar.padStart(8, "0"); // Ensure each character is 8 bits long
    }
    binaryString = binaryString.padStart(minLength, "0");

    return binaryString;
  }
}

export default CustomFile;
