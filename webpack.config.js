var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './src/test',
	output: {
		filename: './src/test-output.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.js']
	}
};