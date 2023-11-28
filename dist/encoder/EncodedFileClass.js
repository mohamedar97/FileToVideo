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
        this.length = fs.statSync(path).size * 8; // Multiple by 8 because fs.statSync returns the file size in bytes
        this.nameHex = this.convertTextToHex(this.name, 256); // Converts the name string to Hex representation with a minimum length of 256 hex chars
        this.extensionHex = this.convertTextToHex(this.extension, 16); // Converts the extension string to Hex representation with a minimum length of 16 hex chars
        this.lengthHex = this.length.toString(16).padStart(16, "0"); // Converts the length number to Hex representation with a minimum length of 16 hex chars
        this.metaData = this.nameHex + this.extensionHex + this.lengthHex;
    }
    convertTextToHex(text, minLength) {
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
exports.default = EncodedFile;
//# sourceMappingURL=EncodedFileClass.js.map