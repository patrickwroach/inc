const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
   entry: __dirname + '/app/main.js',
   output: {
		filename: 'index.js',
		path: __dirname + '/build'
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
         }, {
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader',
				'less-loader'
			]
		 }, {
			test: /\.(png|svg|jpg|gif)$/,
			use: [
				'file-loader'
			]
		 }
      ]
   },
   devServer: {
      inline: true
   },
   plugins: [
		new CleanWebpackPlugin(['build']),
		HTMLWebpackPluginConfig
   ]
}

module.exports = config;