"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
// This class represents all the information related to an encoded file
class EncodedFile {
    // Constructor
    constructor(path) {
        this.path = path;
        this.name = this.path.split(".")[0];
        this.extension = this.path.split(".")[1];
        this.length = fs.statSync(path).size * 8;
        this.nameBinary = this.convertTextToBinary(this.name, 1024); // Converts the name string to binary representation with a minimum length of 1024 bits
        this.extensionBinary = this.convertTextToBinary(this.extension, 64); // Converts the extension string to binary representation with a minimum length of 64 bits
        this.lengthBinary = this.length.toString(2).padStart(32, "0"); // Converts the length number to binary representation with a minimum length of 32 bits
        this.metaData = this.nameBinary + this.extensionBinary + this.lengthBinary;
    }
    convertTextToBinary(text, minLength) {
        let binaryString = "";
        for (let i = 0; i < text.length; i++) {
            const binaryChar = text.charCodeAt(i).toString(2);
            binaryString += binaryChar.padStart(8, "0"); // Ensure each character is 8 bits long
        }
        binaryString = binaryString.padStart(minLength, "0");
        return binaryString;
    }
}
exports.default = EncodedFile;
//# sourceMappingURL=EncodedFileClass.js.map