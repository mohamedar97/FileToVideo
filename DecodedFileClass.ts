class DecodedFile {
  completeFile: string;
  nameBinary: string;
  extensionBinary: string;
  lengthBinary: string;
  name: string;
  extension: string;
  length: string;
  content: string;

  constructor(completeFile: string) {
    this.completeFile = completeFile;
    this.nameBinary = this.completeFile.slice(0, 1024);
    this.extensionBinary = this.completeFile.slice(1024, 1088);
    this.lengthBinary = this.completeFile.slice(1088, 1120);
    this.name = this.convertToASCII(this.nameBinary).replace(/\x00/g, "");
    this.extension = this.convertToASCII(this.extensionBinary).replace(
      /\x00/g,
      ""
    );
    this.length = parseInt(this.lengthBinary, 2).toString();
    this.content = this.completeFile.slice(1120, Number(this.length) + 1120);
  }

  private convertToASCII(binaryText: string): string {
    const binaryArray = binaryText.match(/.{1,8}/g); // Split binary into groups of 8 bits
    const text = binaryArray!
      .map((binaryByte) => String.fromCharCode(parseInt(binaryByte, 2)))
      .join("");
    return text;
  }
  private binaryToNumbers(binaryText: string): string {
    const binaryArray = binaryText.match(/.{1,8}/g); // Split binary into groups of 8 bits
    const numbers = binaryArray!.map((binaryByte) => parseInt(binaryByte, 2));
    const numbersString = numbers.join(" ");

    return numbersString;
  }
}

export default DecodedFile;
