

// Map each own enumerable key -> mapped value.
// - For primitives: the value becomes `typeof value` (string).
// - For objects/arrays/functions: we map their inner entries recursively.
// - Protects against cycles by emitting the string "[Circular]".
function json_humanTypes(v) {
	let seen = new WeakSet();

	return R(v);
	// ----

	function R(v) {
		if (v == null) {
			return v+'';
		}
		// Primitives (including bigint, symbol, boolean, number, string) and null
		if (typeof v === 'object') ;
		else if (typeof v === 'function') ;
		else if (
			typeof v === 'bigint'
			||
			typeof v === 'symbol'
			||
			typeof v === 'boolean'
			||
			typeof v === 'number'
			||
			typeof v === 'string'
		) {
			return typeof v;
		}
		else {
			return 'unknown type: ' + typeof v;
		}

		// Detect cycles
		try {
			if (seen.has(v)) return '[Circular]';
			seen.add(v);
		} catch (e) {
			// WeakSet ops may throw on exotic hosts; fall back to a simple marker
			return '[Circular] (weakmap throws)';
		}

		// Arrays -> map to an array of mapped entries
		if (Array.isArray(v)) {
			let out = [];
			for (let i = 0; i < v.length; i++) {
				try {
					out.push(R(v[i]));
				} catch (e) {
					out.push('[throws]');
				}
			}
			return out;
		}

		// Objects and functions: map own enumerable string keys -> mapped value
		try {
			let entries = Object.entries(v);
			if (entries.length === 0) {
				if (typeof v === 'function') return 'function ';
				if (typeof v === 'object') return 'object ';
			}
			let mapped = Object.fromEntries(
				entries.map(([k, val]) => {
					try {
						return [k, R(val)];
					} catch (e) {
						return [k, '[throws]'];
					}
				})
			);
			return mapped;
		} catch (e) {
			// If Object.entries throws (very exotic), return a marker with typeof
			return '[unenumerable:' + (typeof v) + ']';
		}
	};
}

/* Examples:
let o = { mynumber: 123, nested: { a: 1, b: [true, { x: 2 }] }, fn: function(){}, n: null };
console.log(safeStringifyMapped(o));
// -> {"mynumber":"number","nested":{"a":"number","b":["boolean",{"x":"number"}]},"fn":{},"n":"object"}

let arr = [1, {a:2}, [3,4]];
console.log(safeStringifyMapped(arr));
// -> ["number",{"a":"number"},["number","number"]]
*/