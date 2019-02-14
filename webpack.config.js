// 由于 webpack 是基于Node进行构建的，所有，webpack的配置文件中，任何合法的Node代码都是支持的
var path = require('path')
var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')

// 行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供 要打包 的文件的 入口 和 出口文件，此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个 配置对象，然后根据这个对象，进行打包构建
module.exports = {
  devtool: "source-map",
  mode:'development',
  // entry: path.join(__dirname, './src/main.js'), // 入口文件
  entry:{ //入口
		bundle:path.join(__dirname, './src/main.js'),
		/*flexible:'flexible.js',
		zepto:'zepto.min.js'*/
     // test:path.join(__dirname, './src/test.js'),
		// common:[
		// 	path.join(__dirname, './src/test.js')/*,
		// 	'./src/zepto.min.js'*/
		// ]
  },
  output: {
    // filename: '[name]_[hash].js',
    filename: '[name].js',
    path: path.join(__dirname, './dist')
  },
  // output: { // 指定输出选项
  //   path: path.join(__dirname, './dist'), // 输出路径
  //   // publicPath: '',//cdn
  //   // filename: 'bundle.js' // 指定输出文件的名称
  //   filename: '[name]._[hash].js' // 指定输出文件的名称
  //
  // },
  plugins:[
    new htmlWebpackPlugin({
      template:path.join(__dirname, './src/index.html'),
      filename:"index.html"
    })
  ],
  optimization:{
    splitChunks:{
      name: 'common'
    }
  },
  module:{
    rules:[
      {test:/\.css$/,use:["style-loader","css-loader"]},
      {test:/\.scss$/,use:["style-loader","css-loader?modules=true&localIdentName=[path][name]-[local]-[hash:5]","sass-loader"]},
      {test:/\.js$/,use:"babel-loader",exclude:/(node_modules|bower_components)/},
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
      // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
    ]
  }
}
