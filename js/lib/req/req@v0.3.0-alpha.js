var req;req = (_=>{

req.basepath = {__proto__:null}; // must be redefined
////// req.basepath = 'https://cdn.jsdelivr.net/gh/denisde4ev'
req.modules = {};


req._Module = function(name, url, request) {
	//this._oldExports =
	this.exports = {};
	this.name = name;
	this.url = url;
	this.request = request;
	this.isloaded = false;
}

req._evalmodule = (code, module) => {
	// unpure function: meant to modify module.exports. (and eval might do anything else)
	if (!code.includes('//# sourceURL')) {
		code += (
			'\n'+
			'\n'+
			'//# sourceURL=' + module.url +'\n'+
		'');
	}
	var exports = module.exports;
	var returnedValue = Function(
		'code, module, exports',
		'return eval(code);'
	)(code, module, exports);
	// NOTE:! using `returnedValue` is in testing feature and might be removed in future

	if (exports !== module.exports) {
		console.warn('in lib: '+module.name+'. module.exports is overwritten, this might break some circular dependency')
		if (typeof module.exports === 'function') console.error('new export is a function!');
		Object.assign(exports, module.exports); // at least try to assign new vars to old export. but it'll still break if new export is function
	} else if (0 < Object.keys(module.exports).length) {
		// ok
	} else if (returnedValue) {
		console.warn('in lib: '+module.name+'. using returnedValue as module.exports, returnedValue is in testing feature and might be removed in future');
		Object.assign(exports, module.exports = returnedValue);
	} else {
		console.warn('in lib: '+module.name+'. seems like module.exports have not defined props');
	}
	module.isloaded = true;
	module.request = null;
	return module.exports;

	//return (
	//	 exports !== module.exports // when module.exports is overwritten, note: this will breake for circular dependency
	//	 || 0 < Object.keys(module.exports).length
	//	 	? module.exports
	//	 	: returnedValue
	//);
};


function req(name, isasync = false) {
	var url;
	if (
		name.startsWith('https://') || 
		name.startsWith('http://') ||
		name.startsWith('//') ||
	false) {
		url = name;
	} else {
		if (name.endsWith('.js')) {
			name = name.slice(0, -3);
		}
		// todo/but: what if name is `name='script?v=1'`...
		url = req.basepath + '/' + name + '.js';
	}

	var module = req.modules[name];
	if (module) {
		if (isasync) return module;
		if (module.request && module.request.async) {
			console.warn('req used on async loading lib, note: aborting old request and starting sync one');
			module.request.abort();
		} else {
			if (!module.isloaded) console.error('lib is not in request but is not being loaded, name: '+name);
			// yes, return module even if module is not loaded, module can be required only once (+1 exeption for first async then sync req call)
			return module.exports;
		}
	} else {
		if (!isasync) {
			console.warn('req used on not loaded lib: ' + name);
		}
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, isasync);
		xhr.async = isasync;
		module = req.modules[name] = new req._Module(name, url, xhr);

		xhr.onload = e => {
			var code = e.target.responseText;
			req._evalmodule(code, module);
		};
		xhr.send();
	}

	if (isasync) return { module: module }; // TODO:! return promise

	if (!module.isloaded) {
		throw new Error('lib: '+name+'. is still loading for sync request');
	}

	return module.exports;
}

if (typeof module !== 'undefined') module.exports.req = req; // pointless, but ok
return req;
})();
