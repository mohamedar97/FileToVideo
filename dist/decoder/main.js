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
const decoder = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const extractedMetaData = yield (0, readFrames_1.default)({
        extractMetaDataOnly: true,
    }); // Read frames takes two arguments that will be explained in the readFrames function, but this true is passed here to indicate that we only need to extract the file's meta data
    const extractedFile = new DecodedFileClass_1.default(extractedMetaData, options.frameHeight, options.frameWidth); // Passes the extracted meta data to create a file class
    yield (0, readFrames_1.default)({
        extractMetaDataOnly: false,
        decodedFile: extractedFile,
    }); // Passes false to indicate we don't need the meta data, and
});
exports.default = decoder;
//# sourceMappingURL=main.js.map