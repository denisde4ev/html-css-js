

// TODO: better use Reflect to get all values
// and for unenumerable set some info in `['unenumerable@json_stringify_safe: ", { ... }]`
// for geter same `["getter@json_stringify_safe: ", fn]` but if getter works, then `{ "getter+setter-value@json_stringify_safe":, (type=${type}) ${value}]`
// if can't get value (throws error) then set value "getter+setter@json_stringify_safe" (without mentioning the fns)
// or but I dont like it, too long: `{ "getter@json_stringify_safe": fn, "setter@json_stringify_safe": fn }`

function json_stringify_safe(v) {
	let seen = new WeakSet();

	//seen.add(this);
	seen.add(globalThis); // optional, recommended

	return R(v);
	// ----

	function justPrimitive(v) { return v; }

	//function safeSay(s, s2){
	//	if (s2) {
	//		//s2 = s2.replace(/^ ?/, ' ');
	//		s2 = ' '+s2;
	//	} else {
	//		s2 = '';
	//	}
	//	return s+'@json_stringify_safe'+s2;
	//}

	// "safe" just means "safeString" for JSON, but gets too long function name
	// just "safe" is ok

	function safeSay(s) {
		return s+'@json_stringify_safe';
	}

	function safeSay2(s, s2){
		return s+'@json_stringify_safe '+s2;
	}

	var safeErr = safeSay;
	var safeErr2 = safeSay2;

	//function safeErr(s, s2) {
	//	return safeSay(s, s2);
	//}


	function safeSpecial(v) {
		let str
		if (v) str = v.toString();
		else str = v + '';

		return `${typeof v}@json_stringify_safe: ${str}`;
	}

	function trimStr(str, limit = 10) {
		if (str.length <= limit) {
			return str;
		} else if (limit < str.length) {
			return str.substring(0, limit) + "...";
		} else {
			throw new Error('bad comparison in limit and str.length');
		}
	}



	function R(v) {
		if (v === null) return justPrimitive(null); // remember `typeof null === "object"`

		// Primitives (including bigint, symbol, boolean, number, string) and null
		if (0);
		else if (typeof v === 'undefined') return safeSpecial(v);
		//else if (typeof v === 'null')      return justPrimitive(v); // lol, nope, not a type null
		else if (typeof v === 'object') ;
		else if (typeof v === 'function') ;
		else if (typeof v === 'bigint')    return safeSpecial(v);
		else if (typeof v === 'symbol')    return safeSpecial(v);
		else if (typeof v === 'boolean')   return justPrimitive(v);
		else if (typeof v === 'number')    return justPrimitive(v);
		else if (typeof v === 'string')    return trimStr(v); // NOTE:! trimming all strings here
		else {
			return safeErr(`unknown type: ${typeof v}`);
		}

		// Detect cycles
		try {
			if (seen.has(v)) return safeErr("Circular");
			seen.add(v);
		} catch (e) {
			// WeakSet ops may throw on exotic hosts; fall back to a simple marker
			return safeErr("Circular (weakmap throws)");
		}

		// Arrays -> map to an array of mapped entries
		if (Array.isArray(v)) {
			let out = new Array(v.length);
			for (let i = 0; i < v.length; i++) {
				let iv, ivErr
				try {
					iv = v[i];
				} catch (e) {
					ivErr = safeErr2(`throws`, `${e.name}: ${e.message}`);
				}
				if (ivErr) {
					out.push(ivErr);
				} else {
					//try {
					out.push(R(iv));
					//}
				}
			}
			return out;
		}

		// Objects and functions: map own enumerable string keys -> mapped value
		try {
			//if (0) {
			//let entries = Object.entries(v);
			//if (entries.length === 0) {
			//	if (typeof v === 'function') return safeSpecial(v);
			//	//if (typeof v === 'object') return safeErr("empty object"); // NOTE: for debugging/testing if enum missed obj, better comment this line
			//}
			//let mapped = Object.fromEntries(
			//	entries.map(([k, val]) => {
			//		//try {
			//			return [k, R(val)];
			//		//} catch (e) {
			//		//	return [k, safeErr("throws!")];
			//		//}
			//	})
			//);
			//return mapped;
			//}

			let mapped = {};
			// this seems fine, better dont use original objects constructor, nor Object.create,
			// __proto__ could have setters and mess thisng up

			//let some = false;
			for (let k in v) {
				//some = true;
				let kv, kvErr
				try {
					kv = v[k];
				} catch (e) {
					kvErr = safeErr2(`throws`, `${e.name}: ${e.message}`);
				}
				if (kvErr) {
					mapped[k] = kvErr;
				} else {
					//try {
					mapped[k] = R(iv);
					//}
				}
			}
			//if (some === false) if (typeof v === 'function') return safeSpecial(v);
			if (typeof v === 'function') mapped[safeSay('function')] = trimStr(v.toString());

			// json_stringify_objToValue(v) // TODO:! check if we can use this here

		} catch (e) {
			// If Object.entries throws (very exotic), return a marker with typeof
			return safeErr2(`throws`, `unenumerable? type=${typeof v}, error: ${e.name}: ${e.message}`);
		}
	};
}
