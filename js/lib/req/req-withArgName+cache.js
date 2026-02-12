

function req(name, vars) { // `vars` may be (string or array) of valid js variable names
	var _cache = name+':'+vars;
	if (req.loaded.hasOwnProperty(_cache)) return req.loaded[_cache];

	var module = {exports: {}, req: req};
	
	var r =  Function(
		vars || 'module',
		Hget( req.basepath+name.replace(/\.js$|$/,'.js') )+
		(vars? 'return '+(vars instanceof Array ? '['+vars+']' : vars )  :'')
	)(vars ? void 0 : module);

	return req.loaded[_cache] = vars ? r : module.exports;
}
req.loaded = {};
req.basepath = '/assets/js/'


// usage: req('mycountlib')
//        req('mycountlib', 'countLib, countLibAsync')[1]