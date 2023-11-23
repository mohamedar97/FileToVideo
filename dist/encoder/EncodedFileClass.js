"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class EncodedFile {
    // Constructor
    constructor(path) {
        this.path = path;
        this.name = this.path.split(".")[0];
        this.extension = this.path.split(".")[1];
        this.content = "";
        this.length = fs.statSync(path).size * 8;
        this.nameBinary = this.convertTextToBinary(this.name, 1024);
        this.extensionBinary = this.convertTextToBinary(this.extension, 64);
        this.lengthBinary = this.length.toString(2).padStart(32, "0");
        this.metaData = this.nameBinary + this.extensionBinary + this.lengthBinary;
        this.completeFile = "";
        this.completeFileLength = 0;
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