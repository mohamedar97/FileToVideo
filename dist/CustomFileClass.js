"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readBinaryFile_js_1 = require("./readBinaryFile.js");
class CustomFile {
    // Constructor
    constructor(path) {
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
    readFileData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const binaryData = yield (0, readBinaryFile_js_1.readBinaryFile)(this.path);
                this.content = binaryData;
                this.length = this.content.length;
                this.lengthBinary = this.convertToBinary(this.length.toString(), 32);
                this.metaData =
                    this.nameBinary + this.extensionBinary + this.lengthBinary;
                this.completeFile = this.metaData + this.content;
            }
            catch (error) {
                console.error("Error reading file:", error);
                throw error; // Re-throw the error if needed
            }
        });
    }
    convertToBinary(text, minLength) {
        let binaryString = "";
        for (let i = 0; i < text.length; i++) {
            const binaryChar = text.charCodeAt(i).toString(2);
            binaryString += binaryChar.padStart(8, "0"); // Ensure each character is 8 bits long
        }
        binaryString = binaryString.padStart(minLength, "0");
        return binaryString;
    }
}
exports.default = CustomFile;
//# sourceMappingURL=CustomFileClass.js.map