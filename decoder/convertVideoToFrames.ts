import ffmpeg = require("fluent-ffmpeg");
import * as fs from "fs";

const convertVideoToFrames = () => {
  return new Promise<void>((resolve, reject) => {
    const inputVideoPath = "encoded_output/output.mp4";
    const outputFramesPattern = "frames/frame_%d.png";

    // Create output folder if it doesn't exist
    if (!fs.existsSync("decoder/frames")) {
      fs.mkdirSync("decoder/frames");
    }

    ffmpeg(inputVideoPath)
      .on("filenames", (filenames: string[]) => {
        console.log(`Will generate ${filenames.length} frames`);
      })
      .on("end", () => {
        console.log("Finished generating frames");
        resolve(); // Resolve the promise when the process is complete
      })
      .on("error", (err: Error) => {
        console.error(`Error: ${err.message}`);
        reject(err); // Reject the promise if there's an error
      })
      .outputOptions("-start_number", "0") // Set start_number to 0
      .output(outputFramesPattern)
      .run();
  });
};

export default convertVideoToFrames;
