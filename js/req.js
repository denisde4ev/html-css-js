

function req(name) {
	if (req.loaded[name]) return req.loaded[name];

	var module = {exports: {},req: req};

	Function(
		'module',
		Hget( req.basepath+name.replace(/\.js$|$/,'.js') )
	)(module);

	return req.loaded[name] = module.exports;
}
req.loaded = {};
req.basepath = '/assets/js/'
