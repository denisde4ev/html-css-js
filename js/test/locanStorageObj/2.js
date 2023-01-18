{
let _obj, obj = new Proxy(_obj = {
	////__proto__: null,
	has: key => localStorage.hasOwnProperty(key),
	getSet: (key, def) => _obj.has(key) ? obj[key] : obj[key] = def,
	del: key => { delete _obj[key]; localStorage.removeItem(key); },

	reEval: key => _obj[key] = eval(localStorage.getItem(key)),
	////unCache: key => { delete _obj[key]; },
	updateIfNew: key => {
		_obj[key] = eval(localStorage.getItem(key)),
	},
	write: key => { // write (updated) key back to localStorage
		if (typeof obj === 'object') obj = ;
			localStorage.setItem(key, )
	}
}, {
	get(_obj, key, that) {
		//var proxy_options = this;
		////if (Object.hasOwn(_obj, key)) return _obj[key]; // if already cached, retrun cache
		if (key in _obj) return _obj[key]; // return cached or value in proto ////
		if (_obj.has(key)) return _obj.reEval(key); // do not set prop if localStorage does not have it
	},
	set(_obj, key, val, that) {
		_obj[key] = val;
		;
	}
});
_obj._cache = _obj; // expose cache
var localStorageObj = obj;
}