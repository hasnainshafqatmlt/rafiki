const { resolve } = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	devtool: 'cheap-module-eval-source-map',

	entry: [
	'webpack-hot-middleware/client?reload=true',
		resolve(__dirname, 'app/main.js')
	],

	output: {
		path: resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/'
	},

	//context: resolve(__dirname, 'app'),

	module: {
		rules: [
			// {
			//   enforce: "pre",
			//   test: /\.js$/,
			//   exclude: /node_modules/,
			//   loader: "eslint-loader",
			//   options: {
			//     emitError: false,
			//     failOnError: false
			//   }
			// },
			{
				test: /\.js$/,
				loaders: [
					'babel-loader',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
								loader: "css-loader", query: {
										sourceMap: true,
										//modules: true, // junky class names
										camelCase: true,
										importLoaders: 1,
								}
						}, {
								loader: "sass-loader?modules=true", query: {
										sourceMap: true,
										modules: true,
					importLoaders: 2,
					localIdentName: "[name]--[local]--[hash:base64:8]"
								}
						}],
				}),
			},
			{ test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
			{ test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
			{ test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },

			// { test: /\.json$/, loader: 'json-loader' },
			// { test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap' },
			// { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },

		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: 'app/index.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new webpack.LoaderOptionsPlugin({
			test: /\.js$/,
			options: {
				eslint: {
					//configFile: resolve(__dirname, '.eslintrc'),
					cache: false,
				}
			},
		}),
		new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
		//new CopyWebpackPlugin([{ from: 'vendors', to: 'vendors' }]),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // local | development
		})
	]
};

module.exports = config;
