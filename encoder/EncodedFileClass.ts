const fs = require("fs");

// This class represents all the information related to an encoded file

class EncodedFile {
  // Properties
  path: string; // File location
  name: string; // File name
  extension: string; // File Extension
  length: number; // Number of bits in the file
  nameBinary: string; // Binary representation of the file name stored in 1024 bits
  extensionBinary: string; // Binary representation of the file extension stored in 64 bits
  lengthBinary: string; // Binary representation of the file length stored in 32 bits
  metaData: string; // A string consisting of 1120 bits representing all the metadata for the encoded file to make the decoding process possible

  // Constructor
  constructor(path: string) {
    this.path = path;
    this.name = this.path.split(".")[0];
    this.extension = this.path.split(".")[1];
    this.length = fs.statSync(path).size * 8;
    this.nameBinary = this.convertTextToBinary(this.name, 1024); // Converts the name string to binary representation with a minimum length of 1024 bits
    this.extensionBinary = this.convertTextToBinary(this.extension, 64); // Converts the extension string to binary representation with a minimum length of 64 bits
    this.lengthBinary = this.length.toString(2).padStart(32, "0"); // Converts the length number to binary representation with a minimum length of 32 bits
    this.metaData = this.nameBinary + this.extensionBinary + this.lengthBinary;
  }

  private convertTextToBinary(text: string, minLength: number): string {
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
