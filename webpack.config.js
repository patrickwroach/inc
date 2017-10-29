var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});

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
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		 }
      ]
   },
   devServer: {
      inline: true
   },
   plugins: [
		HTMLWebpackPluginConfig
   ]
}

module.exports = config;