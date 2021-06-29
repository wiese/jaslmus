const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  publicPath: "./",
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from:
              "node_modules/midi-js-soundfonts/FatBoy/acoustic_grand_piano-mp3",
            to: "soundfont"
          }
        ]
      })
    ]
  }
};
