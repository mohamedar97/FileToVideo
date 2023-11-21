import { readBinaryFile } from "./readBinaryFile.js";

class EncodedFile {
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
  completeFileLength: number;

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
    this.completeFileLength = 0;
  }

  public async readFileData(): Promise<void> {
    try {
      const binaryData = await readBinaryFile(this.path);
      this.content = binaryData;
      this.length = this.content.length;
      this.lengthBinary = this.length.toString(2).padStart(32, "0");
      this.metaData =
        this.nameBinary + this.extensionBinary + this.lengthBinary;
      this.completeFile = this.metaData + this.content;
      this, (this.completeFileLength = this.completeFile.length);
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

export default EncodedFile;
