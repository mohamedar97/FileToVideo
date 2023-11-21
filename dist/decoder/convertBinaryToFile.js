"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const binaryStringToFile = (binaryString, filePath) => {
    // Convert binary string to Uint8Array
    const binaryData = Uint8Array.from(binaryString.match(/.{1,8}/g).map((byte) => parseInt(byte, 2)));
    // Create a Buffer from the Uint8Array
    const buffer = Buffer.from(binaryData);
    // Write the Buffer to a file
    fs.writeFileSync(filePath, buffer);
};
exports.default = binaryStringToFile;
//# sourceMappingURL=convertBinaryToFile.js.map