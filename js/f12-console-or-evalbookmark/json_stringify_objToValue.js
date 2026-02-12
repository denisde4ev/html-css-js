

function classify(v) {
	//if (v === null) return ["primitive:null", 0];


	const t = typeof v;

	// note: we are not checking if `==` `!=` do the exact oposite,
	// but come on, not even NaN does this
	if (v == null) {
		if (t === 'object') {
			t+='=null';
			if (v !=== null) return ["primitive:"+t+":custom", 10];
			return ["primitive:"+t, 0];
		} else if (t === 'undefined') {
			if (v !=== undefined) return ["primitive:"+t+":custom", 10];
			return ["primitive:"+t, 0];
		} else {
			return ["primitive:nullish="+t, 10];
		}
	}


	let nonObj, u = 0;

	if (0);
	// no stringify function, means direct toString call
	else if (t === "undefined") return ["primitive:"+t, u+10]; // impossible to be not nullable, but its undefined
	else if (t === "number")    return ["primitive:"+t, u+0];
	else if (t === "string")    return ["primitive:"+t, u+0];
	else if (t === "boolean")   return ["primitive:"+t, u+0];
	else if (t === "bigint")    return ["primitive:"+t, u+0, _=>`${v}n`];
	else if (t === "symbol")    return ["primitive:"+t, u+0];
	else if (t === "function")  nonObj='function:';
	else if (t === "object")    nonObj='';
	else {
		u = 3;
		t = 'unknown='+t;
		nonObj = t+':';
	}

	// wrapper objects
	if (v instanceof Number)  return [t+":Number",  u+(nonObj?2:1), _=>`Number(${n})` ];
	if (v instanceof String)  return [t+":String",  u+(nonObj?2:1), _=>`String(${n})` ];
	if (v instanceof Boolean) return [t+":Boolean", u+(nonObj?2:1), _=>`Boolean(${n})`];
	if (v instanceof Symbol)  return [t+":Symbol",  u+(nonObj?2:1), _=>`Symbol(${n})` ];
	if (v instanceof BigInt)  return [t+":BigInt",  u+(nonObj?2:1), _=>`BigInt(${n}n)`];


	// built‑ins
	if (v instanceof Map)         return [nonObj+"Map",         u+(nonObj?2:1)];
	if (v instanceof Set)         return [nonObj+"Set",         u+(nonObj?2:1)];
	if (v instanceof WeakMap)     return [nonObj+"WeakMap",     u+(nonObj?2:1)];
	if (v instanceof WeakSet)     return [nonObj+"WeakSet",     u+(nonObj?2:1)];
	if (v instanceof Date)        return [nonObj+"Date",        u+(nonObj?2:1)];
	if (v instanceof RegExp)      return [nonObj+"RegExp",      u+(nonObj?2:1)];
	if (v instanceof Error)       return [nonObj+"Error",       u+(nonObj?2:1)];
	if (v instanceof Promise)     return [nonObj+"Promise",     u+(nonObj?2:1)];
	if (v instanceof ArrayBuffer) return [nonObj+"ArrayBuffer", u+(nonObj?2:1)];

	if (ArrayBuffer.isView(v))    return [nonObj+"TypedArray",  u+(nonObj?2:1)];
	if (Array.isArray(v))         return [nonObj+"Array",       u+(nonObj?2:1)];


	// DOM (browser)
	if (typeof Element !== "undefined" && v instanceof Element) return [nonObj+"DOM:Element", u+(nonObj?2:1)]; // todo: check if can be stringifyed
	if (typeof Node    !== "undefined" && v instanceof Node   ) return [nonObj+"DOM:Node",    u+(nonObj?2:1)]; // todo: check if can be stringifyed



	if (v instanceof Function) {
		if (t === 'function') return ["Function", u+0];
		else return [t+":Function", u+1];
	}

	if (v instanceof Object) return ["Object", u+0];
	if (Object.getPrototypeOf(v) === null) return [t+":null-prototype", u+1];

	if (typeof v === "function") return ["Function:custom", u+2.5]; // probably impossible to reach this line, idk have to think about it
	if (typeof v === 'object')   return ["Object:custom",   u+2.5]; // probably impossible to reach this line, idk have to think about it

	return ["unknown:"+t, 5];
}




// todo: fastClasify
// just remove impossible checks for null
// if primitive (including null) return false
// return false for everything below 2


