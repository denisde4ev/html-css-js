var fs = require('fs'); // yes, `req` is requireing fs node module

// this version of req for nodejs is more intednded for testing then rather actuall practilall usage

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

// todo: check if there is something similar to "//# sourceURL={{URL}}" for nodejs
req.evalmodule = (code, module) => {
	var exports = module.exports;
	var returnedValue = Function('module, exports, __SOURCE__', 'return eval(__SOURCE__);')(module, exports, code);

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
	//req.get = new Function( 1 +    atob('YXN5bmMgbmFtZSA9PiB7CglpZiAobmFtZS5lbmRzV2l0aCgnLmpzJykpIG5hbWUgPSBuYW1lLnNsaWNlKDAsLTMpOyAKCglpZiAocmVxLmxvYWRlZFtuYW1lXSkgewoJCWNvbnNvbGUud2FybihuZXcgRXJyb3IoJ2xpYiByZXF1aXJlZCBtdWx0aXBsZSB0aW1lOiAnK25hbWUpKTsKCQlyZXR1cm4gcmVxLmxvYWRlZFtuYW1lXTsKCX0KCgl2YXIgY29kZSA9IGF3YWl0IChhd2FpdCBmZXRjaChyZXEuYmFzZXBhdGggKyAnLycgKyBuYW1lICsgJy5qcycpKS50ZXh0KCk7CglyZXR1cm4gcmVxLmxvYWRlZFtuYW1lXSA9IHJlcS5ldmFsbW9kdWxlKGNvZGUpOwp9Ow=='));
	req.get = new Function(atob("aWYoIWdsb2JhbFRoaXMuQWJvcnRDb250cm9sbGVyKXt0aHJvdyAnbWlzc2luZyBBYm9ydENvbnRyb2xsZXInfXJlcS5nZXQ9YXN5bmMgbmFtZT0+e2lmKE9iamVjdC5oYXNPd24ocmVxLmxvYWRlZCxuYW1lKSl7bGV0IGxvYWRpbmc9cmVxLmxvYWRpbmdbbmFtZV07aWYoIWxvYWRpbmcpe3JldHVybiByZXEubG9hZGVkW25hbWVdfWVsc2UgaWYobG9hZGluZz09PXRydWUpe2NvbnNvbGUud2FybigncmVxIHVzZWQgb24gc3luYyBsb2FkaW5nIGxpYjogJytuYW1lKycsIHRoaXMgc2hvdWxkIG5vdCBiZSBwb3NzaWJsZSEnLG5ldyBFcnJvcignJykpO3JldHVybiByZXEubG9hZGVkW25hbWVdfWVsc2V7Y29uc29sZS53YXJuKCdyZXEgdXNlZCBvbiBsb2FkaW5nIGxpYjogJytuYW1lLG5ldyBFcnJvcignJykpO3JldHVybiByZXEubG9hZGVkW25hbWVdfX10cnl7dmFyIGxvYWRpbmc9e307cmVxLmxvYWRpbmdbbmFtZV09bG9hZGluZzt2YXIgY29udHJvbGxlcj1uZXcgQWJvcnRDb250cm9sbGVyKCk7dmFyIHNpZ25hbD1jb250cm9sbGVyLnNpZ25hbDt2YXIgZmV0Y2hpbmc9ZmV0Y2gocmVxLmJhc2VwYXRoKycvJytuYW1lKycuanMnLHtzaWduYWx9KTt2YXIgY29kZT1hd2FpdChhd2FpdCBmZXRjaGluZykudGV4dCgpO3ZhciBleHBvcnRlZD1yZXEuZXZhbG1vZHVsZShjb2RlKTtyZXEubG9hZGluZ1tuYW1lXT1mYWxzZTtyZXR1cm4gcmVxLmxvYWRlZFtuYW1lXT1leHBvcnRlZH1jYXRjaChlKXtyZXEubG9hZGluZ1tuYW1lXT1mYWxzZTtjb25zb2xlLmVycm9yKCdmYWlsZWQgdG8gYXN5bmMgbG9hZCBsaWI6ICcrbmFtZSk7dGhyb3cgZX19Ow==" ));
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
