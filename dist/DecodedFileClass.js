"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DecodedFile {
    constructor(completeFile) {
        this.completeFile = completeFile;
        this.nameBinary = this.completeFile.slice(0, 1024);
        this.extensionBinary = this.completeFile.slice(1024, 1088);
        this.lengthBinary = this.completeFile.slice(1088, 1120);
        this.name = this.convertToASCII(this.nameBinary);
        this.extension = this.convertToASCII(this.extensionBinary);
        this.length = parseInt(this.lengthBinary, 2).toString();
        this.content = this.completeFile.slice(1120, Number(this.length) + 1120);
    }
    convertToASCII(binaryText) {
        const binaryArray = binaryText.match(/.{1,8}/g); // Split binary into groups of 8 bits
        const text = binaryArray
            .map((binaryByte) => String.fromCharCode(parseInt(binaryByte, 2)))
            .join("");
        return text;
    }
    binaryToNumbers(binaryText) {
        const binaryArray = binaryText.match(/.{1,8}/g); // Split binary into groups of 8 bits
        const numbers = binaryArray.map((binaryByte) => parseInt(binaryByte, 2));
        const numbersString = numbers.join(" ");
        return numbersString;
    }
}
exports.default = DecodedFile;
//# sourceMappingURL=DecodedFileClass.js.map