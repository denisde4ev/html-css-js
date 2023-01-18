
// still in testing

// p = new Proxy(function () {
// 	console.log(this,arguments)
// }, {
//   apply(_obj, that, args) {
// 		//return 5;
//     return _obj.apply(that, args);
//   },
// 	construct(_obj, args, that) {
// 		//console.log({args,that});
// 		return new Number(55);
//   },
// });

function p() {
	
	//console.log(this,arguments)
}

p.prototype.a = 'no'
Object.setPrototypeOf(p.prototype,null);

var p_proto = {
	__proto__: null, // this prop is important
	a: 'ok'
};
p.prototype = new Proxy(p.prototype, {
	getPrototypeOf(_obj) {
		debugger
		return p_proto;
	},
	get(_obj, k, that) {
		if (k === '__proto___') return p_proto;
		//console.log({_obj, k, that});
		if (k in p_proto) return p_proto[k];
		return _obj[k];
	},
	set(_obj, k, v, that) {
		//if (k in _obj) return _obj[k] 
		return Reflect.defineProperty(that, k, {
			value: v,
			enumerable: true,
			configurable: true,
			writable: true,
		} );
	} 
	
})

//debugger
//Function.prototype.call.call(p, 000,1,2);

a = new p(1,2,3);
a.a = 1; a.a