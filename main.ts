import decoder from "./decoder/main";
import encoder from "./encoder/main";

// #############################################
// The encoder works perfectly, however the decoder isn't working properly. Mainly because the conversion from video to frames isn't functioning as expected. The extracted pictures from the video aren't similar to the original ones.
// #############################################

// The entry point for the program. Uncomment the part the you wish to use
const frameWidth = 1920;
const frameHeight = 1080;
// The encoder takes a file, reads its data, converts it to frames, then converts those frames to a video file
// encoder({
//   filePath: "test.pdf",
//   frameHeight,
//   frameWidth,
// });

// The decoder takes a video, converts it to frames, then takes those frames, extracts their binary data and converts them to their original file formate
decoder({ filePath: "./output/", frameWidth, frameHeight });
