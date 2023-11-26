class DecodedFile {
  binaryMetaData: string; // The binary for the meta data
  nameBinary: string; // File name in binary
  extensionBinary: string; // File extension in binary
  lengthBinary: string; // File length in binary
  name: string; // File name in ASCII
  extension: string; // File extension in ASCII
  length: number; // Number of bits in the file
  videoFrameHeight: number;
  videoFrameWidth: number;

  constructor(
    binaryMetaData: string,
    videoFrameHeight: number,
    videoFrameWidth: number
  ) {
    this.binaryMetaData = binaryMetaData;
    this.videoFrameHeight = videoFrameHeight;
    this.videoFrameWidth = videoFrameWidth;
    this.nameBinary = this.binaryMetaData.slice(0, 1024); // First 1024 bits are for the name
    this.extensionBinary = this.binaryMetaData.slice(1024, 1088); // The following 64 bits are for the extension
    this.lengthBinary = this.binaryMetaData.slice(1088, 1152); // The following 64 bits are for the length
    this.name = this.convertToASCII(this.nameBinary).replace(/\x00/g, "");
    this.extension = this.convertToASCII(this.extensionBinary).replace(
      /\x00/g,
      ""
    );
    this.length = Number(parseInt(this.lengthBinary, 2).toString());
  }

  private convertToASCII(binaryText: string): string {
    const binaryArray = binaryText.match(/.{1,8}/g); // Split binary into groups of 8 bits
    const text = binaryArray!
      .map((binaryByte) => String.fromCharCode(parseInt(binaryByte, 2)))
      .join("");
    return text;
  }
}

export default DecodedFile;
