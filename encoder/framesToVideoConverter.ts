import ffmpeg = require("fluent-ffmpeg");
import * as glob from "glob";

const framesToVideoConverter = () => {
  // Set the path to the FFmpeg binary
  ffmpeg.setFfmpegPath("/opt/homebrew/bin/ffmpeg");

  // Input images path and output video path
  const imagesPath = "frames/*.png"; // Path to images
  const outputVideoPath = "output.mp4"; // Output video path

  // Get a list of input image files
  const imageFiles = glob.sync(imagesPath);

  // Convert images to video
  ffmpeg()
    .input(`concat:${imageFiles.join("|")}`)
    .inputFormat("image2pipe")
    .inputFPS(30) // Frames per second
    .output(outputVideoPath)
    .on("end", () => {
      console.log("Conversion finished.");
    })
    .on("error", (err: string) => {
      console.error("Error:", err);
    })
    .run();
};

export default framesToVideoConverter;
