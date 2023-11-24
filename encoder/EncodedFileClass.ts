const fs = require("fs");

// This class represents all the information related to an encoded file

class EncodedFile {
  // Properties
  path: string; // File location
  name: string; // File name
  extension: string; // File Extension
  length: number; // Number of bits in the file
  nameHex: string; // Hex representation of the file name stored in 1024 bits
  extensionHex: string; // Hex representation of the file extension stored in 64 bits
  lengthHex: string; // Hex representation of the file length stored in 32 bits
  metaData: string; // A string consisting of 1120 bits representing all the metadata for the encoded file to make the decoding process possible

  // Constructor
  constructor(path: string) {
    this.path = path;
    this.name = this.path.split(".")[0];
    this.extension = this.path.split(".")[1];
    this.length = fs.statSync(path).size * 8;
    this.nameHex = this.convertTextToHex(this.name, 256); // Converts the name string to Hex representation with a minimum length of 256 hex chars
    this.extensionHex = this.convertTextToHex(this.extension, 16); // Converts the extension string to Hex representation with a minimum length of 16 hex chars
    this.lengthHex = this.length.toString(16).padStart(16, "0"); // Converts the length number to Hex representation with a minimum length of 16 hex chars
    this.metaData = this.nameHex + this.extensionHex + this.lengthHex;
  }

  private convertTextToHex(text: string, minLength: number): string {
    let hexString = "";
    for (let i = 0; i < text.length; i++) {
      const hexChar = text.charCodeAt(i).toString(16);
      hexString += hexChar;
      // HexString += hexChar.padStart(2, "0"); // Ensure each character is 8 bits long
    }
    hexString = hexString.padStart(minLength, "0");
    return hexString;
  }
}

export default EncodedFile;
