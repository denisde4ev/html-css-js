{
let _obj, obj = new Proxy(_obj = {
	//__proto__: null,
	has: k => localStorage.hasOwnProperty(k),
	getSet: (key, def) => _obj.has(key) ? obj[key] : obj[key] = def,
}, {
	get(_obj, key, that) {
		//var proxy_options = this;
		//if (Object.hasOwn(_obj, key)) return _obj[key]; // if already cached, retrun cache
		if (key in _obj) return _obj[key]; // return cached or value in proto
		if (_obj.has(key)) return _obj[key] = eval(localStorage.getItem(key)); // do not set prop if localStorage does not have it
	},
	set(_obj, key, value, that) {
		localStorage.setItem(key, _obj[key] = value);
	}
});
_obj._cache = _obj; // expose cache
var localStorageObj = obj;
}