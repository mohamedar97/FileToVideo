"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DecodedFile {
    constructor(binaryMetaData, videoFrameHeight, videoFrameWidth) {
        this.binaryMetaData = binaryMetaData;
        this.videoFrameHeight = videoFrameHeight;
        this.videoFrameWidth = videoFrameWidth;
        this.nameBinary = this.binaryMetaData.slice(0, 1024); // First 1024 bits are for the name
        this.extensionBinary = this.binaryMetaData.slice(1024, 1088); // The following 64 bits are for the extension
        this.lengthBinary = this.binaryMetaData.slice(1088, 1152); // The following 64 bits are for the length
        this.name = this.convertToASCII(this.nameBinary).replace(/\x00/g, "");
        this.extension = this.convertToASCII(this.extensionBinary).replace(/\x00/g, "");
        this.length = Number(parseInt(this.lengthBinary, 2).toString());
    }
    convertToASCII(binaryText) {
        const binaryArray = binaryText.match(/.{1,8}/g); // Split binary into groups of 8 bits
        const text = binaryArray
            .map((binaryByte) => String.fromCharCode(parseInt(binaryByte, 2)))
            .join("");
        return text;
    }
}
exports.default = DecodedFile;
//# sourceMappingURL=DecodedFileClass.js.map