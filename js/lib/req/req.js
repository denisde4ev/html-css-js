
if (!Object.hasOwn) {
	Object.hasOwn = function(obj, prop) {
		return Object.prototype.hasOwnProperty.call(obj, prop);
	};
}



var req = function(name) {
	//if (name.endsWith('.js')) name = name.slice(0,-3);
	if (Object.hasOwn(req.loaded,name)) {
		return req.loaded[name];
	}

	console.warn('req is acsessing missing lib');

	var x = new XMLHttpRequest();
	x.open('GET', req.basepath + '/' + name + '.js', false);
	x.send();
	if (x.status !== 200) throw new Error('module req HTTP status: '+x.status, { x:x, name:name });
	var code = x.responseText;

	return req.loaded[name] = req.evalmodule(code);
};


req.evalmodule = code => {
	var _givenexports = {}, module = {exports: _givenexports};
	var returnedValue = Function('module, code', 'return eval(code);')(module, code);

	return (
		 _givenexports !== module.exports ||
		 0 < Object.keys(module.exports).length
		 	? module.exports
		 	: returnedValue
	);
};

req.loaded = {};
req.basepath = '/' //{__proto__: null}; // must be defined


try {
	req.get = new Function( 1 +    atob('YXN5bmMgbmFtZSA9PiB7CglpZiAobmFtZS5lbmRzV2l0aCgnLmpzJykpIG5hbWUgPSBuYW1lLnNsaWNlKDAsLTMpOyAKCglpZiAocmVxLmxvYWRlZFtuYW1lXSkgewoJCWNvbnNvbGUud2FybihuZXcgRXJyb3IoJ2xpYiByZXF1aXJlZCBtdWx0aXBsZSB0aW1lOiAnK25hbWUpKTsKCQlyZXR1cm4gcmVxLmxvYWRlZFtuYW1lXTsKCX0KCgl2YXIgY29kZSA9IGF3YWl0IChhd2FpdCBmZXRjaChyZXEuYmFzZXBhdGggKyAnLycgKyBuYW1lICsgJy5qcycpKS50ZXh0KCk7CglyZXR1cm4gcmVxLmxvYWRlZFtuYW1lXSA9IHJlcS5ldmFsbW9kdWxlKGNvZGUpOwp9Ow=='));
} catch (e) {
	let _Promise = window.Promise || function(cb) { var r; cb(a => r = a); this.then = function(cb) { this.then=0; cb(r); }; };
	req.get = name => new _Promise(r => r(req(name)));
}
/*
req.get = async name => {
	if (name.endsWith('.js')) name = name.slice(0,-3); 

	if (req.loaded[name]) {
		console.warn(new Error('lib required multiple time: '+name));
		return req.loaded[name];
	}

	var code = await (await fetch(req.basepath + '/' + name + '.js')).text();
	return req.loaded[name] = req.evalmodule(code);
};
*/



req // last value is returned if eval
