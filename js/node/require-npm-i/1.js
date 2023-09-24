module.exports = function(_module) {
	const PATHSEP = process.env.PATHSEP || '/';

	_module.dirname ||=
		// note: never tested edge cases, what if the scrpt is in rootdir '/script.js'
		_module.filename.substr(0, _module.filename.lastIndexOf(PATHSEP))
	;

	// 
	// console.log(require('fs').existsSync(`${_module.dirname}${PATHSEP}node_modules`))
	// process.exit(123);

	if (!require('fs').existsSync(`${_module.dirname}${PATHSEP}node_modules`)) {
		require('child_process').execSync(
			'npm install',
			{ cwd: _module.dirname, stdio: 'inherit' },
		);
	}
};
