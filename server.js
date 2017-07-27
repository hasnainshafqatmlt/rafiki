'use strict';

const Path = require('path');
const Express = require('express');
const ServeStatic = require('serve-static');
const Compression = require('compression');
const Webpack = require('webpack');
const historyApiFallback  = require('connect-history-api-fallback');
const WebpackMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const Favicon = require('serve-favicon');

const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT ? process.env.PORT : 3000;


const indexFile = '/index.html';
let env; // for local

const app = Express();

app.use(Favicon(__dirname + '/public/favicon.ico'));

if (isDeveloping) {
	env = 'development';

	const compiler = Webpack(config);
	app.use(historyApiFallback({
		verbose: false
	}));

	const middleware = WebpackMiddleware(compiler, {
		publicPath: config.output.publicPath,
		contentBase: 'app',
			stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	});

	app.use(middleware);
	app.use(WebpackHotMiddleware(compiler));
	app.use(ServeStatic(__dirname + '/public'));
	app.use(ServeStatic(__dirname + '/static'));
	app.get('*', function response(req, res) {
		res.write(middleware.fileSystem.readFileSync(Path.join(__dirname, 'dist/index.html')));
		res.end();
	});
} else {
	env = 'production';

	app.use(Compression());
	app.use(ServeStatic(__dirname + '/dist', {'index': ['index.html']}));
	app.use(ServeStatic(__dirname + '/public'));
	app.use(ServeStatic(__dirname + '/static'));

	app.get('*', function response(req, res) {
		res.sendFile(Path.join(__dirname, 'dist/index.html'));
	});
}

// Listen
const server = app.listen(port, function () {
	// https://github.com/glenjamin/webpack-hot-middleware/issues/210
	// https://github.com/nodejs/node/pull/13549
	// Maybe fixed in node > 8
	server.keepAliveTimeout = 0;

	console.log('App listening on port %s in %s mode', port, env);
});
