const path = require('path');

module.exports = {
  entry: './src/mgba.js',
  output: {
    filename: 'mgba.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'mGBA', // 导出为全局变量mGBA
    libraryTarget: 'window'
  },
  mode: 'production'
};