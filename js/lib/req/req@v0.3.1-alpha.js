
//note: no one rely on this fn, left for backup/stage



// TODO: fix bad class pattern

/**
 * @param {string} basePath
 * @returns {req}
 */
var Req;Req = (/** @type {string} */ basePath => {

/** @type {string} */
req.basePath = basePath; // note: for now no checking if no value. assume correct input

// example basePath: 'https://cdn.jsdelivr.net/gh/denisde4ev'
req.modules = {};


/**
 * @constructor
 * @param {string} name
 * @param {string|URL} url
 * @param {XMLHttpRequest} [request]
 * @returns {req.Module}
 */
req.Module = function(name, url, request) {
	//this._oldExports =
	/** @type {Object.<string, any>} */
	this.exports = {};
	/** @type {string} */
	this.name = name;
	/** @type {string|URL} */
	this.url = url;
	/** @type {XMLHttpRequest} */
	this.request = request;
	/** @type {boolean|string} */
	this.isloaded = false;


	/** @type {any} */
	this.result = undefined;

	/** @type {Promise<any>} */
	this._p = undefined;
	/** @type {Function} */
	this._p_o = undefined;
	/** @type {Function} */
	this._p_x = undefined;
}

/**
 * @param {string} name
 * @returns {req.Module}
 */
req.getModule = function(name) {
	if (name.endsWith('.js')) {
		name = name.slice(0, -3);
	}
	var module = req.modules[name];
	if (!module) {
		module = new req.Module(name, req.urlFromName(name));
		req.modules[name] = module;
	}
	return module;
}

/**
 * @param {string} name
 * @param {string|boolean} [basePath] - If true, uses req.basePath. If false, throws error.
 * @returns {string}
 */
req.urlFromName = function(name, basePath) {
	if (
		basePath !== true && (
			name.startsWith('https://') || 
			name.startsWith('http://') ||
			name.startsWith('//') ||
			name.startsWith('./') ||
			name === '.' ||
		false)
	) {
		return name;
	}

	if (basePath === false) {
		throw new Error(['url requires basePath', {name: name, basePath: basePath}]);
	}

	if (basePath == null || basePath === true) basePath = this.basePath;
	if (typeof basePath !== 'string') {
		throw new Error(['bad basePath', {name: name, basePath: basePath}]);
	}



	// todo/but: what if name is `name='script?v=1'`...
	if (name.endsWith('.js')) {
		name = name.slice(0, -3);
	}
	var url = basePath + '/' + name + '.js';

	return url;
}

/**
 * @param {string} code
 * @param {req.Module} module
 * @returns {any}
 */
req._evalmodule = (code, module) => {
	// unpure function: meant to modify module.exports. (and eval might do anything else)
	module.isloaded = 'loading...';
	module.request = null;

	if (!code.includes('//# sourceURL')) {
		code = (
			code + '\n'+
			'\n'+
			'//# sourceURL=' + module.url +'\n'+
		'');
	}
	var oldExports = module.exports;
	/** @type {any} */
	var returnedValue = Function(
		'code, module, exports',
		'return eval(code);',
	)(code, module, oldExports);
	// NOTE:! using `returnedValue` is in testing feature and might be removed in future

	var newExports = module.exports;


	{ // validate result value + keep it for oldExports

		// atempt 1 / naive 1 liner check, left for historical preservations
		// but it has sume good logic if the executed code redefined module exports, then its aware of exports and want the new export
		// and if nothing changed in `module.exports` then check returned value => the way all short scripts with `eval('fn my(){}')`
		//
		//return (
		//	 exports !== module.exports // when module.exports is overwritten, note: this will breake for circular dependency
		//	 || 0 < Object.keys(module.exports).length
		//	 	? module.exports
		//	 	: returnedValue
		//);


		// case like this mess:
		//oldExports = { a: 1, b: 2, default: 7 };
		//newExports = { c: 3, d: 4, default: 6 };
		//newExports = null;
		//newExports = function(){};
		//returnedValue = 5;
		// in such a case, I'll prioritize newExports, props will be assigned to oldExports
		// and then if both of them (if new != old at all) if they both have no props keys().len===0 then I'll get returned value,
		// and for both I'll asign if (not obj) (.default = returned) else obj asign

		var resultExports;
		/** @type {any} */
		var result;

		// note: we never check if newExports is object, just leave native error


		if (typeof newExports !== 'object') { // in most cases will be fn
			if (newExports != null) { // who does this!
				oldExports.default = newExports; // NOTE: here I may overwrite the old prop, I asume in most cases will be the same fn/val, or I think its correct to preffer (nonboject)`oldValue`
			} else {
				console.warn('in lib: '+module.name+'. bad new module.exports is nullish');
			}
			//newExports = oldExports;
			resultExports = oldExports;
		} else if (oldExports !== newExports) {
			console.warn('in lib: '+module.name+'. module.exports is overwritten, this might break some circular dependency')
			resultExports = newExports;

			// folow the code and make up your explanation, saving `oldExports_keys` it correct
			let oldExports_keys = Object.keys(oldExports);
			for (let k of Object.keys(newExports)) {
				oldExports[k] = newExports[k];
			}
			for (let k of oldExports_keys) {
				if (!Object.hasOwn(newExports, k)) newExports[k] = oldExports[k];
			}
		} else {
			resultExports = newExports;
		}


		// note: we care only for resultExports and oldExports
		// newExports is only for extracting

		if (Object.keys(resultExports).length === 0 && returnedValue !== undefined) {
			console.warn('in lib: '+module.name+'. using returnedValue as module.exports');
			result = returnedValue;

			if (typeof returnedValue === 'object') {
				if (resultExports !== oldExports) {
					Object.assign(oldExports, returnedValue);
				}
				Object.assign(resultExports, returnedValue);
			} else {
				if (resultExports !== oldExports) {
					oldExports.default = returnedValue;
				}
				resultExports.default = returnedValue;
			}
		}

		if (Object.keys(resultExports).length === 0) {
			console.warn('in lib: '+module.name+'. empty export');
		}

		if (result == null) result = resultExports;
	}
	module.exports = resultExports;
	module.result = result;
	module.isloaded = true;

	return result;
};



// req(name:string)
// req(name:string, isasync:bool)
// req(name:string, url:string|URL, isasync:bool)

function req(
	/** @type {string} */ name,
	/** @type {string|URL|boolean|undefined} */ arg2,
	/** @type {boolean|undefined} */ arg3
) {
	/** @type {boolean} */
	var isasync;
	if (typeof arg2 === 'boolean') { // note: we dont check if arg3 as bool, well this is the same as calling function(a){} with 2 or more args
		isasync = arg2;
	} else if (typeof arg3 === 'boolean') {
		isasync = arg3;
	} else {
		isasync = true; // default
	}

	/** @type {string|URL} */
	var url;
	if (typeof arg2 === 'object') {
		if (arg2 instanceof URL) {
			url = arg2;
		//} else if (arg2 instanceof URLSearchParams) { // for now no check for this
		//  url = ...;
		} else {
			throw new Error('expected arg2 to be object of URL');
		}
	} else if (typeof arg2 === 'string') {
		url = arg2;
	} else {
		url = req.urlFromName(name);
	}

	if (name.endsWith('.js')) {
		name = name.slice(0, -3);
	}




	var /** @type {req.Module} */ module = req.modules[name];

	var /** @type {Promise<any>} */ p;
	var /** @type {Function} */ p_o;
	var /** @type {Function} */ p_x;
	var /** @type {Function} */ old_p_o;
	var /** @type {Function} */ old_p_x;


	if (module) {
		if (isasync) {
			if (module._p) {
				return module._p;
				// NOTE: here we might have circular dependency
				// TODO:!!! test this
				// probbably: this will probbably never return/resovle, main module is on .then on itself
			}
			if (module.isloaded) { // loaded using sync req
				//if (module.isloaded === 'loading...') throw new Error('circular dependency');
				return module._p = Promise.resolve(module.returns);
			}
			// note: case where we have pre-defined module and no promise/request
			// just continue on and make the request
		} else {
			if (module.isloaded) {
				//if (module.isloaded === 'loading...') throw new Error('circular dependency');
				return module.result;
			}
			if (module._p) {
				// someone have made async req and now someone called sync one
				// (probably lazy load lib, and now user clicked on button or something)

				// we dont want to reject the old promise, just the request
				console.warn('req used on async loading lib, switching to sync (resolving old promise with new result): ' + name);
				if (module.request) {
					module.request.isSyncAborting = true;
					module.request.abort();
					module.request = null;
				} else {
					throw new Error('req used on async loading lib, but no request found');
					// probably circular dependency
					// TODO:!!! test this
				}

				old_p_o = module._p_o;
				old_p_x = module._p_x;
			}
		}
	}



	{
		if (isasync) {
			p = new Promise((o,x) => (p_o=o, p_x=x));
		} else {
			console.warn('note: req sync used on not loaded lib: ' + name);
			p_x = e => { throw e.err | e; };
			p_o = () => {};
		}
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, isasync);
		if (!module) {
			module = new req.Module(name, url, xhr);
			req.modules[name] = module;
		}

		xhr.onload = e => {
			try {
				// todo:! check response status + response header content type
				var /** @type {string} */ code = e.target.responseText;
				p_o(req._evalmodule(code, module));
			} catch (err) {
				p_x({type: 'throws', e: e, err: err});
			}

		};
		xhr.ontimeout = e => { p_x({ok: false, type: "timeout",       e: e}); };
		xhr.onerror   = e => { p_x({ok: false, type: "network_error", e: e}); };
		xhr.onabort   = e => { if (e.target.isSyncAborting) return; p_x({ok: false, type: "request_abort", e: e}); }; // TODO:! check if any sync calls are called, and resolve from it
		xhr.send();
	};

	if (isasync) {
		p.module = module;
		module._p = p;
		module._p_o = p_o;
		module._p_x = p_x;
		return p;
	} else {
		if (!module.isloaded) {
			let errstr = 'lib: '+name+'. is still loading for sync request';
			if (old_p_x) old_p_x({ok: false, errstr: errstr});
			throw new Error(errstr);
		}
		if (module.isloaded === 'loading...') {
			let errstr = 'lib: '+name+'. failed to load';
			if (old_p_x) old_p_x({ok: false, errstr: errstr});
			throw new Error(errstr);
		}

		if (old_p_o) old_p_o(module.result);
		return module.result;
	}


}

return req;

});

if (typeof module !== 'undefined') module.exports.Req = Req; // pointless, but ok
Req;
