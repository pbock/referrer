'use strict';

const express = require('express');
const path = require('path');

const defaults = {
	port: 9000,
	mountPath: '/',
}

let config;
try {
	config = Object.assign({}, defaults, require('../config'));
} catch(e) {
	console.log('No configuration found, using defaults.');
	config = defaults;
}

const app = express();
app.get('/headers/', (req, res) => {
	const headers = {};
	// Filter x-* headers
	Object.keys(req.headers).forEach(headerName => {
		if (headerName.substring(0, 2) !== 'x-') headers[headerName] = req.headers[headerName];
	});
	const json = JSON.stringify({ headers }, null, '\t');
	res.set('Content-type', 'application/json').send(json);
})
app.use(express.static(path.resolve(__dirname, '../src')));

let mount = app;
if (config.mountPath && config.mountPath !== '/') {
	console.log('Mounting app at %s', config.mountPath);
	mount = express();
	mount.use(config.mountPath, app);
}

mount.listen(config.port, () => {
	console.log('Listening on :%s', config.port);
});
