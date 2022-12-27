
// finally a jQuery alternative for speed and small code size

// browser retur value prediction:
// firefox: this file is entirely dediceded to making firefox prediction
// and it f**inng works. even `q('*').prop('innerHTML')` works (the one that does not work in chrome even from this file!)

// for many fns this._ might be null, just leave native error

// 4 slashes for a comment means optional feature

Object.defineProperties(q.prototype, {
	'0': { get: function () { return this._[0]; } },
	'length': { get: function () { return this._.length; } },
});

Object.assign(q.prototype, {
	[Symbol.iterator]() { ////
		return this._[Symbol.iterator](); ////
	}, ////

	f(fn) {
		var a = this._;
		if ( a.forEach ) {
			a.forEach(fn);
		} else {
			//for ( let i; i < a.length; ++i ) {
			//	fn(el, i, a);
			//}
			for (let el of a) fn(el);
		}
		return this;
	},

	prop(k, v) {
		if (arguments.length <= 1) return this._[0][k]; // no null check, leave native error
		return this.f(el => el[k] = v);
	},
	attr(k, v) {
		if (arguments.length <= 1) return this._[0].getAttribute(k); // no null check, leave native error
		return this.f(el => el.setAttribute(k, v));
	},

	on(type, fn, opt) { ////
		return this.f(el => el.addEventListener(event, fn, opt)); ////
	}, ////
	off(type, fn, opt) { ////
		return this.f(el => el.removeEventListener(event, fn, opt)); ////
	}, ////


	// better use: .prop('innerHTML', 'str...')
	html(H) { ////
		if (H == null) return this._[0].innerHTML; ////
		return this.f(el => el.innerHTML = H); ////
	}, ////

	addClass(name) { ////
		return this.f(el => el.classList.add(name)); ////
	}, ////
	removeClass(name) { ////
		return this.f(el => el.classList.remove(name)); ////
	}, ////
	// consider `toggleclass(name, bool)` with 2 args


});

q.prototype.each = q.prototype.q;
//q.prototype.delClass = q.prototype.removeClass;


q.new = document.createElement.bind(document);
q.one = function(A, B) { return q( (B||document).querySelector(A) ); }
function q(A, B) {
	if (!(this instanceof q)) return new q(A, B);

	var _ = (
		typeof A === 'string' ? (
			A[0] === '<' ? (
				B = q.new('q'),
				B.innerHTML = A,
				B.children
			) : (
				(B || document).querySelectorAll(A)
			)
		) : typeof A === 'object' ? (
			0 <= A.length ? (
				A
			) : A.nodeName ? (
				[A]
			) : null
		) : null
	);

	// FF code predictoin stops when using:
	// * `Object.create`
	// * `Object.assign`
	// * `with()` but sometimes
	// * `this.setval = 1`
	// * `document.createElement` does not work at all

	// badcode to make firefox completion work:
	return {
		_: _,

		0: _[0],

		constructor: q,
		//Object.keys(q.prototype).join('\n')
		f: q.prototype.f,
		prop: q.prototype.prop,
		attr: q.prototype.attr,
		on: q.prototype.on,
		off: q.prototype.off,
		html: q.prototype.html,
		addClass: q.prototype.addClass,
		removeClass: q.prototype.removeClass,
	};
};

if (typeof module === 'object') {
	module.exports.q = q;
	//module.exports.q1 = q1; ////
}
