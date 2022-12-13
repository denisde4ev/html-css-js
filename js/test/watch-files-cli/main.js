'use strict';






throw 'NOT DONE !!!!'










var fs = require('fs');
var path = require('path');
var program = require('commander');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var pug = require('pug');

var basename = path.basename;
var dirname = path.dirname;
var resolve = path.resolve;
var normalize = path.normalize;
var join = path.join;
var relative = path.relative;





// SOURCE IS `pug` from npm pug-cli

function watchFile(path, base, rootPath) {
	var log = '  ' + chalk.gray('watching') + ' ' + chalk.cyan(path);
	if (!base) {
		base = path;
	} else {
		base = normalize(base);
		log += '\n    ' + chalk.gray('as a dependency of') + ' ';
		log += chalk.cyan(base);
	}

	if (watchList[path]) {
		if (watchList[path].indexOf(base) !== -1) return;
		consoleLog(log);
		watchList[path].push(base);
		return;
	}

	consoleLog(log);
	watchList[path] = [base];
	fs.watchFile(path, {persistent: true, interval: 500}, function (curr, prev) {
		// File doesn't exist anymore. Keep watching.
		if (curr.mtime.getTime() === 0) return;
		// istanbul ignore if
		if (curr.mtime.getTime() === prev.mtime.getTime()) return;

		watchList[path].forEach(function(file) {
			console.log(file, rootPath);
		});
	});
}
