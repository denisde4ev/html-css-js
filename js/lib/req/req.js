if (!Object.hasOwn) {
	Object.hasOwn = function(obj, prop) {
		return Object.prototype.hasOwnProperty.call(obj, prop);
	};
}

var req = function(name) {
	if (name.endsWith('.js')) name = name.slice(0,-3);
	var url = req.basepath + '/' + name + '.js';
	if (Object.hasOwn(req.loaded,name)) {
		return req.loaded[name];
	}

	console.warn('req is acsessing missing lib');

	var x = new XMLHttpRequest();
	x.open('GET', url, false);
	x.send();
	if (x.status !== 200) throw new Error('module req HTTP status: '+x.status, { x:x, name:name });
	var code = x.responseText;

	return req.loaded[name] = req.evalmodule(code);
};


req.evalmodule = code => {
	var _givenexports = {}, module = {exports: _givenexports};

	var returnedValue = Function('module, code', 'return eval(code)')(module, code);
	return (
		 _givenexports !== module.exports
		 || 0 < Object.keys(module.exports).length
		 	? module.exports
		 	: returnedValue
	);
};

req.loaded = {};
req.basepath = {__proto__: null}; // must be defined


try {
	/*
	// src:
	async name => {
		if (name.endsWith('.js')) name = name.slice(0,-3);

		if (req.loaded[name]) {


			console.warn(new Error('lib.get required multiple time: '+name));
			return req.loaded[name];
		}

		var code = await (await fetch(req.basepath + '/' + name + '.js')).text();
		return req.loaded[name] = req.evalmodule(code);
	};
	*/
	req.get = eval("async name=>{if(name.endsWith('.js')){name=name.slice(0,-3)}if(req.loaded[name]){console.warn(new Error('lib.get required multiple time: '+name));return req.loaded[name]}var code=await(await fetch(req.basepath+'/'+name+'.js')).text();return req.loaded[name]=req.evalmodule(code)};");
} catch (e) {
	let _Promise = window.Promise || function(cb) { var r; cb(a => r = a); this.then = function(cb) { this.then=0; cb(r); }; };
	req.get = name => new _Promise(r => r(req(name)));
}



req // last value is returned if eval
