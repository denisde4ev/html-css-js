var req, {req} = function(){

if (!Object.hasOwn) {
	Object.hasOwn = function(obj, prop) {
		return Object.prototype.hasOwnProperty.call(obj, prop);
	};
}


var SyncPromise = f => {
	var r;
	f(
		rr => r = rr,
		// e => { if (e instanceof Error) throw e; throw new Error(e); }
		e => { throw new Error(e); }
	);
	return r;
};

var _hGetJs_resolver = (r, j) => x.onloadend = e => (
	(
		e.target.status === 200
		&&
		e.target.getResponseHeader('Content-Type') === 'text/javascript'
		? r
		: j
	)(e)
);
var hGetJs = (url, isasync) => {
	var x = new XMLHttpRequest();
	x.open('GET', url, isasync);
	x.setRequestHeader('Content-Type', 'application/javascript');
	x.send();

	return (
		isasync
		? new Promise(_hGetJs_resolver)
		: SyncPromise(_hGetJs_resolver)
	);
};

var req = function(name, loadasync = false) {
	if (name.endsWith('.js')) name = name.slice(0,-3);
	var url = ( /^[^/]+:\/\//.test(name) ? req.basepath + '/' ) + name + '.js'
	var code = hGetJs(url, loadasync).textContent;

	var loadingModule = req.loadingModule[name];
	if (loadingModule) {
		if (loadingModule.loadasync === loadasync) throw 
	}
	var module = {loadasync: loadasync, exports: {}};

	return req.evalmodule(code, module);
}
req.loadingModule = {};

req.evalmodule = (code, module, isasync) => {
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








////////////////////////////////////////// OLD CODE:





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


//*
// TODO: reimplement req.get using scrpt tag:

function require(dependencies, callback) {
  // Convert the dependencies array to a list of script elements
  var scriptElements = dependencies.map(dep => {
    var script = document.createElement("script");
    script.src = dep;
    return script;
  });

  // Create a module object for each script, with an exports property
  var modules = scriptElements.map(() => ({ exports: {} }));

  // Append the script elements to the head of the document
  scriptElements.forEach((script, index) => {
    script.addEventListener("load", () => {
      // When the script has loaded, set the module object as a property on the window object
      window.module = modules[index];
    });
    document.head.appendChild(script);
  });
  // TODO: how to avoid window.module being used by wrons scripts, and to be removed imideately after script is loaded

  // Wait for all the scripts to load
  let numScriptsLoaded = 0;
  scriptElements.forEach(script => {
    script.addEventListener("load", () => {
      numScriptsLoaded++;
      if (numScriptsLoaded === dependencies.length) {
        // All the scripts have loaded, so execute the callback with the module objects as arguments
        callback(...modules);
      }
    });
  });
}



*/




}(req); // last value is returned if eval
