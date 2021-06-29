/**
 * Download a sound font from https://github.com/gleitz/midi-js-soundfonts
 */
const download = require("github-directory-downloader");
const path = require("path");
const fs = require("fs");

const directory = "/FatBoy/acoustic_grand_piano-mp3";
const repoAndDirectory =
  "https://github.com/gleitz/midi-js-soundfonts/tree/gh-pages" + directory;
const localDirectory =
  __dirname + "/../node_modules/midi-js-soundfonts" + directory;

download(repoAndDirectory, localDirectory).then(stats => {
  if (!stats.success || stats.downloaded === 0) {
    console.error(stats);
    throw new Error("Problem downloading soundfont files!");
  }

  const notes = {};
  Object.keys(stats.files).forEach(file => {
    const filename = path.basename(file);
    const note = filename.substring(0, filename.lastIndexOf("."));
    notes[note] = filename;
  });
  fs.writeFile(localDirectory + "/notes.json", JSON.stringify(notes), function(
    err
  ) {
    if (err) {
      console.error(err);
    }
  });
});
