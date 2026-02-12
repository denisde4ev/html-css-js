

// variant 1 (minified + some new lines):
/* @name window_getNewGlobals */
//if(0)o=
async function window_getNewGlobals(z) {
return (async (w,d) => {
var 
g=new Set(Object.getOwnPropertyNames(w)),
f=document.createElement('iframe')
;f.style.display='none';f.src='about:blank';d.body.appendChild(f);
await new Promise(o=>f.onload=o);
var c=Object.getOwnPropertyNames(f.contentWindow);d.body.removeChild(f);
c.concat(z||[]).forEach(a=>g.delete(a));
var r={};for(const k of g)r[k]=w[k];return r;;
})(window,document);
}



// variant 1. iframe (requires to wait for the iframe to load => promise)
// consider: add cache. this is (browesr+version) constant, no need to check what is the iframe window every time. but not needed for now
//if(0)o=
async function window_getNewGlobals(/* @name ignored */ z) {
	return await (async /* @name window_getNewGlobals */ ( /* @name window */ w, /* @name document */ d) => {
		var g /* @name globalKeys */ = new Set(
			Object.getOwnPropertyNames(w)
			//.filter(a => !Number.isInteger(a)) // if we want to ignore iframes
		);

		// note: adding the iframe adds window[i] = iframe_window
		// however now its not a problem coz we cache keys before adding it to the document
		var f /* @name iframe */ = document.createElement('iframe');
		f.style.display = 'none';
		f.src = 'about:blank';
		d.body.appendChild(f);

		await new Promise(o => f.onload = o); // assume wont fail
		//await new Promise((o,x) => { f.onload = o; f.onerror = x; } ); // line for no timeout
		// with timeout:
		/*
		await Promise.race([
			new Promise((o, x) => {
				f.onload = o;
				f.onerror = x;
			}),
			new Promise((_, rej) => {
				setTimeout(_=> rej(new Error('Iframe load timed out')), 10e3);
			}),
		]);
		*/

		var c /* @name keysToClear */ = Object.getOwnPropertyNames(f.contentWindow);
		d.body.removeChild(f);
		c.concat(z??[]).forEach(a => g.delete(a));


		//return globalKeys; // as Set
		//return [...g.values()]; // as array of keys
		var r = {};
		for (const k of g) r[k] = w[k];
		return r;
	})(window, document);
}



if (0)
// variant 2. check if functions have 'native code' when converted toString
// (big) con: if not a function - cant check
(function window_getNewGlobals(window) {
	return Object.getOwnPropertyNames(window).filter(key => {
		try {
			const val = window[key];
			if (typeof val !== 'function') return true; // we cant check...
			// toString of user-defined or injected functions won’t include "[native code]"
			return !val.toString().includes('[native code]');
		} catch {
			console.info('note: (probably) function cannoct be converted toString. fn window key: '+key);
			return false; // some getters throw
		}
	});
})(window);




}