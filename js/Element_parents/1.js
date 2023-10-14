

// idk still why does this code does not work
// nvm I fold shorter version

//[...{
//	_next: $0,
//	next() {
//		var current = this._next; this._next = null;
//
//		var next = current.parentElement;
//		this._next = next;
//
//		return {
//			value: current,
//			done: !!next,
//		};
//	},
//}];
//
//
//


minifyed1: {
	[...{*_(v){do yield v;while(v=v.parentElement)}}._($0)][...{*_(v){do yield v;while(v=v.parentElement)}}._($0)];
	// 1 bug optimisation, wont work with null/undefined
}

minifyed2: [...{*_(v){for(;el;el=el.parentElement)yield el;}}._($0)];

[...function *(el) {
	for (; el ; el = el.parentElement) {
		yield el;
	}
}($0)];
