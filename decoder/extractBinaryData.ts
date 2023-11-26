import fourBitRGBHashDecodingTable from "./fourBitHashDecodingTable";

const extractBinaryData = (pixelData: Uint8ClampedArray): string => {
  let binaryData = "";
  for (let i = 0; i < pixelData.length; i += 4) {
    // Increments the loop by 4 because each 4 bits represent one pixel's rgba values
    const red = pixelData[i]; // First bit is red
    const green = pixelData[i + 1]; // Second bit is green
    const blue = pixelData[i + 2]; // Third bit is blue
    const key = `rgb(${red}, ${green}, ${blue})`;

    binaryData +=
      fourBitRGBHashDecodingTable[
        key as keyof typeof fourBitRGBHashDecodingTable
      ];
  } // Decodes the pixel value to its coresponding 4 bits value in the table
  return binaryData;
};

export default extractBinaryData;
