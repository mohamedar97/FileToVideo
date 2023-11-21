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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DecodedFileClass_1 = __importDefault(require("./DecodedFileClass"));
const readFrames_1 = __importDefault(require("./readFrames"));
const convertBinaryToFile_1 = __importDefault(require("./convertBinaryToFile"));
const decoder = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const extractedBinaryData = yield (0, readFrames_1.default)();
    const extractedFile = new DecodedFileClass_1.default(extractedBinaryData);
    (0, convertBinaryToFile_1.default)(extractedFile.content, `${options.filePath}${extractedFile.name}.${extractedFile.extension}`);
});
exports.default = decoder;
//# sourceMappingURL=main.js.map