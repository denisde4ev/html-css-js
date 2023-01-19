
// finally a jQuery alternative for speed and small code size

// browser retur value prediction:
// chrome: mostly works `q.one('*').html()` but for some reason `.prop('innerHTML')` does not
// firefox: does not work at all. setting `this._ = ..` stops prediction

// for many fns this._ might be null, just leave native error

// 4 slashes for a comment means optional feature

Object.defineProperties(q.prototype, {
	'0': { get: function () { return this._[0]; } },
	'length': { get: function () { return this._.length; } },
});

{
	if (typeof Symbol !== 'undefined' && Symbol.iterator) q.prototype[Symbol.iterator] = function () { ////
		return this._[Symbol.iterator](); ////
	}; ////

	q.prototype.f = function f(fn) {
		var a = this._;
		if ( a.forEach ) {
			a.forEach(fn);
		} else {
			//for ( let i; i < a.length; ++i ) {
			//	fn(el, i, a);
			//}
			//for (var el of a) fn(el); // FF 24 but dos not work on resent otter browser
			Array.prototype.forEach.call(a,fn); // FF 24 but dos not work on resent otter browser
			
		}
		return this;
	},

	q.prototype.prop = function prop(k, v) {
		if (arguments.length <= 1) return this._[0][k]; // no null check, leave native error
		return this.f(el => el[k] = v);
	},
	q.prototype.attr = function attr(k, v) {
		if (arguments.length <= 1) return this._[0].getAttribute(k); // no null check, leave native error
		return this.f(el => el.setAttribute(k, v));
	},

	q.prototype.on = function on(t, fn, opt) { ////
		return this.f(el => el.addEventListener(t, fn, opt)); ////
	}, ////
	q.prototype.off = function off(t, fn, opt) { ////
		return this.f(el => el.removeEventListener(t, fn, opt)); ////
	}, ////


	// better use: .prop('innerHTML', 'str...')
	q.prototype.html = function html(h) { ////
		if (h == null) return this._[0].innerHTML; ////
		return this.f(el => el.innerHTML = h); ////
	}, ////

	q.prototype.addClass = function addClass(n) { ////
		return this.f(el => el.classList.add(n)); ////
	}, ////
	q.prototype.removeClass = function removeClass(n) { ////
		return this.f(el => el.classList.remove(n)); ////
	}, ////
	// consider `toggleclass(n, bool)` with 2 args

0}

q.prototype.each = q.prototype.q;
//q.prototype.delClass = q.prototype.removeClass;


q.new = document.createElement.bind(document);
q.one = function(A, B) { return q( (B||document).querySelector(A) ); }
function q(A, B) {
	if (!(this instanceof q)) return new q(A, B);

	this._ = (
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
};

if (typeof module === 'object') {
	module.exports.q = q;
	//module.exports.q1 = q1; ////
}
