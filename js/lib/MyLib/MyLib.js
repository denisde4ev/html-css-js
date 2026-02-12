

//throw 'nothing done'
// note: non ai code. hand made slop

//let Req = require('../lib/req/req@v0.3.0-alpha.js') // idc how you are going to load this
//// Req BEGIN DO NOT EDIT
'														'; // DO NOT EDIT

{
	{
		{
			{
				{
					{
						{
							{
								{
									{
										{
											{
												{
													{


														var Req;Req = (basepath => {

														req.basepath = basepath;
														// example basepath: 'https://cdn.jsdelivr.net/gh/denisde4ev'
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
															var p;
															var p_o, p_x;
															if (module) { // TODO:!!! HERE CHECK WHAT IT RETURNS FOR SYNC vs ASYNC, should be promise, idk if should make the request again or ....
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
																if (isasync) {
																	p = new Promise((o,x) => (p_o=o, p_x=x));
																} else {
																	console.warn('req used on not loaded lib: ' + name);
																}
																var xhr = new XMLHttpRequest();
																xhr.open('GET', url, isasync);
																xhr.async = isasync;
																module = req.modules[name] = new req._Module(name, url, xhr);

																xhr.onload = e => {
																	try {
																		// todo:! check response status + response header content type
																		var code = e.target.responseText;
																		req._evalmodule(code, module);
																	} catch (err) {
																		p_x({type: 'throws', e: e, err: err});
																	}
																
																};
																xhr.ontimeout = e => { p_x({ok: false, type: "timeout",       e: e}); };
																xhr.onerror   = e => { p_x({ok: false, type: "network_error", e: e}); };
																xhr.onabort   = e => { p_x({ok: false, type: "request_abort", e: e}); }; // TODO:! check if any sync calls are called, and resolve from it
																xhr.send();
															};

															if (isasync) {
																p.module = module;
																module._p = p;
																return p;
															}

															if (!module.isloaded) {
																throw new Error('lib: '+name+'. is still loading for sync request');
															}

															return module.exports;
														}

														return req;

														});


													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
//// Req END




//// attempt 1:







if (false) o=
class MyLib {
	constructor(url/*, waitStart, waitBetween*/) {
		this.url = url;
		this._modules = {};

		this.req = Req();
		this.req.basepath = url;

		//this._lazyLoading = [];

		if (waitStart) this.startTiming(waitStart, waitBetween);
	};

	//startTiming(waitStart, waitBetween) {
	//
	//	// at end: this._lazyPush = n =
	//};
	//_lazyPush(n) {
	//	this._lazyLoading.push(n);
	//}

	_modules = null;

	//lazy(n) {
	//	this._lazyPush(n);
	//}

	//fetch(n) {
	//	;
	//};
	
	//cache(n) { // cache string
	//	;
	//};

	load(n) {
		var m = this._modules[n];
		if (m) return m; // consider using promise wrap

		this.req(n, true);
	};
	
	run(n, ...args) {
		;
	};
};






//// attempt 2:

// structure:

MyLib = function(urlPrefix, waitStart, waitBetween) {
	if (!(this instanceof MyLib)) return new MyLib(urlPrefix);
	this._req = new Req(urlPrefix);
	// this._urlPrefix = urlPrefix;
	//this.waitStart = waitStart;
	this.waitBetween = waitBetween;
	this._modules = {__proto__:null};

	this._lazyQue = [];

	this._lazyInterval = null;
	this._lazyTimeout = setTimeout(() => {
		this._lazyTimeout = null;
		if (this._lazyQue.length) {
			this._lazyIntervalStart();
		}
	}, waitStart);
};

MyLib.prototype = {
	lazy(libName) {
		var i = this._lazyQue.push(libName);
		if (i === 1 && this._lazyTimeout == null) {
			this._lazyIntervalStart();
		}
		return i;
	},
	// just pushes to `this._lazyQue` and at end return the push index
	// if pushed is (index=1 && this._lazyTimeout == null) then should call this._lazyIntervalStart

	fetch(libName){},
	cache(libName){}, // caches string in `if check before fetching`, do not run
	load(LibName, isAsync = true){},
	// pattern: run(libName, ...args){ if (!this._modulesStatus[LibName].isLoaded) load(libName, true); return returnedFn(...args); },
	run(libName, ...args) {
		var m = this.load(libName, true);
		return (typeof m === 'function') ? m(...args) : m;
	},

	// helper fns:
	isLoaded(l){},
	getModule(l){ return this._modules[l] || (this._modules[l] = this._Module(l)); },

	// internal:
	_Module(l) { return { name: l, url: ..., isLoaded: false } }, // note that url must check if there is this._urlPrefix AND if given l is actually a url, check .startsWith http https or '//'(this is used to use same protocol as the page)
	_lazyIntervalStart() {
		if (this._lazyInterval) return;
		this._lazyInterval = setInterval(()=>{
			if (this._lazyQue.length === 0) {
				clearInterval(this._lazyInterval);
				this._lazyInterval = null;
				return;
			}
			this.load(this._lazyQue.shift());
		}, this.waitBetween);
	},

	get runProxy() { return this.runProxy = // static
		new Proxy(this, {
			get(target, prop) {
				return target.load(prop, true);
			}
		});
	},
	// when trying to access prop should return module (if loaded) else should load (isAsync = false)
}






/*
Example usage:
``` js
const denisde4evGhJs = new MyLib('https://github.com/denisde4ev/html-css-js/raw/master/js', 3e3, 100)
// 3e3 seconds before first lazy load
// 100 time between lazy load

mylib.lazy('mycountlib') // will take time before starts fetching


// later in my code:
function countMyArr(arr = [1,2,3]) {
	return mylibs.load('mycountlib').then(exported => {
		return exported(arr);
	});
}

function countMyArrSync(arr = [1,2,3]) {
	return mylibs.runProxy.mycountlib(arr);
}
```

*/








//// const export

if (typeof module !== 'undefined') module.exports.MyLib = MyLib;
MyLib;






















