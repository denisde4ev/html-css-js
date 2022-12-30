
// yes this is the source file and this is how I wrote it. sry

_m = {};
var req = async n => {
	if ( e=_m[n]/* && Object.keys(_m[n]).length*/ ) return e;
	var u=req.p(n), e=_m[n]=e||{}, m={exports:e}, x=await fetch(u); // don't set request Content-Type. or it'll discard prefethed cache
	if ( !/^(application|text)\/(x-)?javascript($|;)/i.test(x.headers.get('Content-Type')) ) {
		throw new Error('bad Content-Type');
	}
	await Function('module,exports', await x.text()+'\n\n//# sourceURL='+u+'\n')(m, e);
	if (m.exports!==e) e._ = m.exports, Object.assign(e, m.exports); // dont redefine module.exports
	return e;
};
req.b = {__proto__:null}; // req.basepath // value example: 'https://cdn.jsdelivr.net/gh/USER/REPO/LIBDIR', for mine libs: 'https://cdn.jsdelivr.net/gh/denisde4ev/html-css-js/js/lib'
req.p = n => n.replace(/^(https:\/\/)?(.*?)(\.js)?$/,(O,p,n,j)=>p?O:req.b+'/'+n+(j||'.js')); // req.parse
// export req.parse 
