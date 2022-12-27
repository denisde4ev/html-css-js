// never tested
_m = {};
var req = n => {
	if (_m[
		n = n.replace(/^(https:\/\/)?(.*)(\.js)?$/, (O, p, n, j) =>(
			url = p ? O : req.basepath + '/' + n + (j || '.js'),
			n
		))
	]) return _m[n].exports;
	var
		u,
		m = {exports: _m[n] = {}},
		x = new XMLHttpRequest()
	;
	x.open('GET', u, false); x.send();
	Function( 'module, exports', x.responseText+'\n\n//# sourceURL=' + u +'\n' )( m, _m[n] );
	return _m[n];
};
req.basepath = 'https://cdn.jsdelivr.net/gh/denisde4ev/'
