module.exports = {
	entry: './src/example',
	devtool: 'source-map',
	output: {
		filename: './dist/example.js'
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