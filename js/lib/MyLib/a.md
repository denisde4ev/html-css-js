// structure:

MyLib = function(urlPrefix, waitStart, waitBetween) {
	if (!(this instanceof MyLib)) return new MyLib(urlPrefix);
	this._urlPrefix = urlPrefix;
	//this.waitStart = waitStart;
	//this.waitBetween = waitBetween;
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
	lazy(libName){},
	// just pushes to `this._lazyQue` and at end return the push index
	// if pushed is (index=0 && this._lazyTimeout == null) then should call this._lazyIntervalStart

	fetch(libName){},
	cache(libName){}, // caches string in `if check before fetching`, do not run
	load(LibName, sync = false){},
	run(libName, ...args){ if (!this._modulesStatus[LibName].isLoaded) load(libName, true); return returnedFn(...args); },

	// helper fns:
	isLoaded(l){},
	getModule(l){ return this._modules[l] || (this._modules[l] = this._Module(l)); },

	// internal:
	_Module(l) { return { name: l, url: ..., isLoaded: false } }
	_lazyIntervalStart(){}; // sohuld check if there is pushed in `this._lazyQue`

	runProxy: new Proxy(),
	// when trying to access prop should return module (if loaded) else should load (sync = true)
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
