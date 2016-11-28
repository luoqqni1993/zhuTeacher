var webpack = require('webpack')

module.exports = {
  entry: './src/js/main.js',//入口js文件路径
  output: {
    path: "./dest/js",//输出文件路径
    filename: 'bundle.js'//输出文件的文件名
  },
  module: {//配置模块
    loaders: [
      {test: /\.css$/, loader: 'style!css'}//loader相关配置
    ]
  }
}