var Req = function(basePath) {
	if (!(this instanceof Req)) return new Req(basePath);
	this.basePath = basePath;
	this.modules = {};
	return Req.prototype.load.bind(this);
};
Req.prototype.load = function req(name, arg2, arg3) {
	var isasync = typeof arg2 === 'boolean' ? arg2 : typeof arg3 === 'boolean' ? arg3 : true;
	var url;
	if (typeof arg2 === 'object') {
		if (arg2 instanceof URL) {
			url = arg2;
		} else {
			throw new Error('expected arg2 to be object of URL');
		}
	} else if (typeof arg2 === 'string') {
		url = arg2;
	} else {
		url = this.urlFromName(name);
	}
	var module = this.modules[name];
	var p, p_o, p_x, old_p_o, old_p_x;
	if (module) {
		if (isasync) {
			if (module._p) return module._p;
			if (module.isloaded) return module._p = Promise.resolve(module.result);
		} else {
			if (module.isloaded) return module.result;
			if (module._p) {
				console.warn(`req used on async loading lib, switching to sync (resolving old promise with new result): ${name}`);
				if (!module.request) throw 4; // impossible
				module.request.isSyncAborting = true;
				module.request.abort();
				module.request = null;
				old_p_o = module._p_o;
				old_p_x = module._p_x;
			}
		}
	}
	if (isasync) {
		p = new Promise((o,x) => (p_o=o, p_x=x));
	} else {
		console.warn(`note: req sync used on not loaded lib: ${name}`);
		p_x = e => { throw e.err | e; };
		p_o = () => {};
	}
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, isasync);
	if (!module) module = this.modules[name] = new Req.Module(name, url, xhr);
	xhr.onload = e => { // note: no status and content-type checks
		try {
			var code = e.target.responseText;
			p_o(Req._evalmodule(code, module));
		} catch (err) {
			p_x({type: 'throws', e: e, err: err});
		}
	};
	xhr.ontimeout = e => { p_x({ok: false, type: "timeout", e: e}); };
	xhr.onerror = e => { p_x({ok: false, type: "network_error", e: e}); };
	xhr.onabort = e => { if (e.target.isSyncAborting) return; p_x({ok: false, type: "request_abort", e: e}); };
	xhr.send();
	if (isasync) {
		p.module = module;
		module._p = p;
		module._p_o = p_o;
		module._p_x = p_x;
		return p;
	} else {
		if (!module.isloaded) {
			let errstr = `lib: ${name}. is still loading for sync request`;
			if (old_p_x) old_p_x({ok: false, errstr: errstr});
			throw new Error(errstr);
		}
		if (module.isloaded === 'loading...') {
			let errstr = `lib: ${name}. failed to load`;
			if (old_p_x) old_p_x({ok: false, errstr: errstr});
			throw new Error(errstr);
		}
		if (old_p_o) old_p_o(module.result);
		return module.result;
	}
};
Req.prototype.urlFromName = function(name) {
	if (name.startsWith('https://') || name.startsWith('http://') || name.startsWith('//') || name.startsWith('./') || name === '.') {
		return name;
	}
	return `${this.basePath}/${name}.js`;
};
Req.prototype.basePath = {__proto__: null};
Req.prototype.getModule = function(name) {
	return this.modules[name] ?? (this.modules[name] = new Req.Module(name, this.urlFromName(name)));
};
Req.Module = function(name, url, request) {
	if (!(this instanceof Req.Module)) throw new TypeError('Req.Module must be called using new');
	this.name = name;
	this.url = url;
	this.request = request;
	this.exports = {};
	this.isloaded = false;
	// this.result = undefined;
	// this._p = undefined;
	// this._p_o = undefined;
	// this._p_x = undefined;
};
Req._evalmodule = (code, module) => {
	module.isloaded = 'loading...';
	module.request = null;
	if (!code.includes('//# sourceURL')) code = `${code}\n\n//# sourceURL=${module.url}\n`;
	var oldExports = module.exports;
	var returnedValue = Function('code, module, exports','return eval(code);')(code, module, oldExports);
	var newExports = module.exports;
	var resultExports, result;
	if (typeof newExports !== 'object') {
		if (newExports != null) {
			oldExports.default = newExports;
		} else {
			console.warn(`in lib: ${module.name}. bad new module.exports is nullish`);
		}
		resultExports = oldExports;
	} else if (oldExports !== newExports) {
		console.warn(`in lib: ${module.name}. module.exports is overwritten, this might break some circular dependency`);
		resultExports = newExports;
		let oldExports_keys = Object.keys(oldExports);
		Object.assign(oldExports, newExports);
		for (let k of oldExports_keys) if (!Object.hasOwn(newExports, k)) newExports[k] = oldExports[k];
	} else {
		resultExports = newExports;
	}
	if (Object.keys(resultExports).length === 0 && returnedValue !== undefined) {
		console.warn(`in lib: ${module.name}. using returnedValue as module.exports`);
		result = returnedValue;
		if (typeof returnedValue === 'object') {
			if (resultExports !== oldExports) Object.assign(oldExports, returnedValue);
			Object.assign(resultExports, returnedValue);
		} else {
			if (resultExports !== oldExports) oldExports.default = returnedValue;
			resultExports.default = returnedValue;
		}
	}
	if (Object.keys(resultExports).length === 0) console.warn(`in lib: ${module.name}. empty export`);
	if (result == null) result = resultExports;
	module.exports = resultExports;
	module.result = result;
	module.isloaded = true;
	return result;
};
