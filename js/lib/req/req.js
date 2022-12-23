
if (!Object.hasOwn) {
	Object.hasOwn = function(obj, prop) {
		return Object.prototype.hasOwnProperty.call(obj, prop);
	};
}



var req = function(name) {
	if (name.endsWith('.js')) name = name.slice(0,-3);
	if (Object.hasOwn(req.loaded, name)) {
		let loading = req.loading[name];
		if (!loading) {
			return req.loaded[name];
		} else if (loading === true) {
			console.warn('req used on sync loading lib: ' + name + '!', new Error('')); // TODO: test + compare to nodejs require
			return req.loaded[name];
		} else {
			// probably async loading, now we need to force load it
			console.warn('req used on loading lib: ' + name, new Error(''));
			try {
				loading.abort();
			} catch (e) {}
		}
	} else {
		console.warn('req used on missing lib');
	}


	try {
		req.loading[name] = true;
		var module = { exports: req.loaded[name] || {} };
		req.loaded[name] = module.exports;

		var x = new XMLHttpRequest();
		x.open('GET', req.basepath + '/' + name + '.js', false);
		x.send();
		if (x.status !== 200) throw new Error('module req HTTP status: ' + x.status, { x:x, name:name });
		let code = x.responseText;


		var exported = req.evalmodule(code, module);
		req.loading[name] = false;
		return req.loaded[name] = exported;
	} catch (e) {
		req.loading[name] = false;
		console.error('failed to sync load lib: ' + name);
		throw e;
	}
};
req.loading = {}; // key is lib name, val is boolean=true|promise; true = sync load, promise = async load

req.evalmodule = (code, module) => {
	var exports = module.exports;
	var returnedValue = Function('code, module, exports', 'return eval(code);')(code, module, exports);

	return (
		 exports !== module.exports // when module.exports is overwritten, note: this will breake for circular dependency
		 || 0 < Object.keys(module.exports).length
		 	? module.exports
		 	: returnedValue
	);
};

req.loaded = {};
req.basepath = '/' //{__proto__: null}; // must be defined


/*
try {
	req.get = new Function(atob(...));
} catch (e) {
	// todo: better error handling
	let _Promise = window.Promise || function(cb) { var r; cb(a => r = a); this.then = function(cb) { this.then=0; cb(r); }; };
	req.get = name => new _Promise(r => r(req(name)));
}
/*/
if (!globalThis.AbortController) throw 'missing AbortController';
req.get = async name => {
	if (name.endsWith('.js')) name = name.slice(0,-3); 

	if (Object.hasOwn(req.loaded, name)) {
		let loading = req.loading[name];
		if (!loading) {
			return req.loaded[name];
		} else if (loading === true) {
			console.warn('req.get used on sync loading lib: ' + name + ', this should not be possible!', new Error(''));
			return req.loaded[name];
		} else {
			// probably async loading, now we need to force load it
			console.warn('req.get used on loading lib: ' + name, new Error(''));
			return req.loaded[name];
		}
	}


	try {
		var loading = {};
		if (Object.hasOwn(req.loading, name)) console.error(req.loading[name], new Error(4)); // DEBUG
		req.loading[name] = loading; // note: req.loading[name] will always be *missing prop*
		if (Object.hasOwn(req.loaded , name)) console.error(req.loaded [name], new Error(4)); // DEBUG
		var module = { exports: {} }; // note: req.loaded[name] here will always be *missing prop*
		req.loaded[name] = module.exports;

		var controller = new AbortController();
		loading.controller = controller;
		var signal = controller.signal;
		loading.signal = signal;

		var fetching = fetch(req.basepath + '/' + name + '.js', { signal });

		var code = await (await fetching).text();

		var exported = req.evalmodule(code);
		req.loading[name] = false;

		return req.loaded[name] = exported;
	} catch (e) {
		req.loading[name] = false;
		console.error('failed to async load lib: ' + name);
		throw e;
	}
};
//*/



req // last value is returned if eval
