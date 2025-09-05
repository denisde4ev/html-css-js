

// TODO: first move findNestedVal to its own lib


debugger;


// /^/\ https://github.com/denisde4ev/html-css-js/raw/master/js/lib/arrFork.js
function arrFork(arr, k, ...args) {
	arr = Object.create(arr);
	{
		if (typeof k === 'function') k.apply(arr, args); else
		if (typeof k === 'string')   arr[k](...args);    else
		;
	};
	return arr;
};


function arrPushFork(arr, a) { // note: a bit specific to ucecase problem. function name is not 100% descriptive
	if (arr) return arrFork(arr, 'push', a);
	return [a];
};


;function findNestedVal(
	o, searchKey,
	pathKeys = undefined, pathVals = undefined, /*k = undefined,*/
	_R_resultBuff = [],
) {

//	if (!k && Object.hasOwn(o, searchKey)) {
//		//_R_resultBuff ||= [];
////		pushPath();
//		//_R_resultBuff.push({ o, pathKeys, pathVals });
////		_R_resultBuff.push([ o, pathKeys, pathVals ]);
//		_R_resultBuff.push(o); // for now this is only thing I need
//		return _R_resultBuff;
//	}

	if (pathVals) {
		let i = pathVals.indexOf(o);
		//if (0 <= i) {
		if (i !== pathVals.length-1) {
			console.warn('detected circuling object', {o, searchKey, pathVals, i,  pathKeys/*, k*/});
			return;
		}
	}
	//if (0){
	//	if (o[searchKey]) return [[searchKey], [o[searchKey]]]; // main found return
	//	if (o[searchKey]) return true; // main found return
	//}

	var entries = Object.entries(o);
	if (entries.length === 0) return false;

	//var result;
	pathKeys /*||= arrPushFork(pathKeys, k)*/;  // for now not needed, (not commented in errors and recursion as var)
	pathVals ||= arrPushFork(pathVals, o);




	// var found = entries.some(([k, v]) => {
	for (let [k, v] of entries) {
		let current_pathKeys, current_pathVals;
//		current_pathKeys = arrPushFork(pathKeys, k);
		current_pathVals = arrPushFork(pathVals, v);
		// uum, no rutern, we probably want: when we search for e: 'a.b.e' and 'a.b.e.d.e' (yes)
		if (k === searchKey) {
			_R_resultBuff.push(o);
		}

		if (!( (typeof v === 'object' && v !== null) || typeof v === 'function' )) continue;
		if (v === globalThis) {
			console.warn('skipping globalThis', {pathVals, pathKeys,  k, v});
			continue;
		}


		let returned = R(v, searchKey, current_pathKeys, current_pathVals,  /*k,*/  _R_resultBuff);
		if (!returned) continue;

		// when we search c: [ ['a','b','c'], [objA, objB, objC]
		//returned[0].unshift(k);
		//returned[1].unshift(v);
		//return true;

		// when we search e: [
		// 	[['a', objA], ['b1',  objB1],  ['c1', objC1], ['d1', objD1], ['e', objE1],
		// 	[['a', objA], ['b1',  objB1],  ['c2', objC2], ['d2', objD2], ['e', objE2],
		// 	[['a', objA], ['b2',  objB2],  ['c3', objC3], ['e', objE3],
		// ]
		//... // unimplemented,  ... overkill, not needed for now

		// // // when we search e: [ objE1, objE2, ObjE3 ]
		// if (result) {
		// 	// result = result.concat(returned); // pure, no need
		// 	result.push(...returned);
		// } else {
		// 	result = returned;
		// }

		// current _R_resultBuff: when searching e: [
		// [ objC, ['a','b1'], [objA, objB1],
		// [ objC2, ['a','b2','d1'], [objA, objB2, objD1],
		// ]
	};

	return _R_resultBuff;
};

function replaceNestedVal(o, k, v) {
	var symbolKey = Symbol(`${k} replaced`);
	
	var nestedOs = findNestedVal(o, k))
	nestedOs.forEach(oo => {
		var originalVal = oo[k];
		oo[k] = v;
		oo[symbolKey] = originalVal;
	});

	return [symbolKey, nestedOs];
}

if (0) {
	// test on youtube.com
	// all of this was created because I saw script: https://greasyfork.org/en/scripts/421610-youtube-speed-up/code

	//let a = findNestedVal());
	//a.map(a => a.getAvailablePlaybackRates); // to replace

	replaceNestedVal(_yt_player, 'getAvailablePlaybackRates', ...)
}
