
// simple yet so useful for pure scripting

// NOTE:! side effect of using `Object.create` for array
// is that `Array.isArray(arr)` will return false,
// use `arr.constructor === Array`


// v1
function forkArr(arr, k, ...args) {
	arr = Object.create(arr);
	{
		if (typeof k === 'function') k.apply(arr, args);
		else
		if (typeof k === 'string')   arr[k](...args);
	};
	return arr;
}



// v2
function arrFork(arrOrigin, k, ...args) {
	var arr = Object.create(arrOrigin);
	if (typeof k === 'undefined') return arr;
	else if (typeof k === 'string') { arr[k](...args); return arr; } // most of the cases


	if (k === true) {
		// used for `arrFork(document.querySelectorAll('...'), true, 'map', a => ...)`
		// tho it could be just used as: `arrFork(document.querySelectorAll('...'), [].map, a => ...)`
		k = args.shift();
		if (typeof k === 'string') k = Array.prototype[k];

		//// fix: `TypeError: 'get length' called on an object that does not implement interface NodeList.`
		//arr.length = arrOrigin.length; // still does not work, it just triggers __proto__.length setter, and does nothing
		Object.defineProperty(arr, 'length', {
			configurable: true,
			enumerable: false,
			value: arrOrigin.length,
			writable: true,
		});
	} else if (k === false) {
		// just a test
		k = args.shift();

		var descriptors = Object.getOwnPropertyDescriptors(Array.prototype);

		// Object.entries(descriptors).filter(([k,v]) => !v.configurable) // -> for now expected: only length
		//descriptors.length.writable = true;
		//descriptors.length.configurable = true;
		descriptors.length = {
			configurable: true,
			enumerable: false,
			value: arrOrigin.length,
			writable: true,
		};
		//for (let k of descriptors) descriptors[k].configurable = true
		Object.defineProperties(arr, descriptors);
	}

	if (typeof k === 'function') k.apply(arr, args);
	else if (typeof k === 'string') arr[k](...args);

	return arr;
}


// a = [...'123']; 
// b = arrFork(a, 'push', 4);
// 
