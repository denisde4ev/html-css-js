{
const TEST = false;
let exports;
let _exports = typeof module === 'object' && module.exports || (exports = {});
void function(exports) {




// this is bad practice.
// unimplemented: detect if Child constructor is used in inherited class
// has side effect of `obj instanceof Child` to throw error, and must use `obj instanceof Child_inherits_Parent1/2`


function Parent1(x, y) {
	this.x = x;
	this.y = y;
}
Parent1.prototype.sum1 = function() {
	return this.x + this.y;
};
exports.Parent1 = Parent1;


function Parent2(a, b) {
	this.a = a;
	this.b = b;
}
Parent2.prototype.sum2 = function() {
	return this.a + this.b;
};
exports.Parent2 = Parent2;


function Child(is2, a1, a2, z) {
	//if (!this) ; // should be inpossible in JS, JS defaults to globalThis in .call(null/undefined)
	if (this === globalThis) ; // ok, seems no `new` keyword used.
	else if (!this.constructor || this.constructor === Object /*|| this.constructor === Object */) ; // ok, seems to be used on `new Child`
	else throw new TypeError('Child has conditinal inheritence, inheriting Child is not allowed');

	if (is2) {
		var newThis = Object.create(Child.prototype_inherits_Parent2);
	  Parent2.call(newThis, a1, a2);
	} else {
		var newThis = Object.create(Child.prototype_inherits_Parent1);
	  Parent1.call(newThis, a1, a2);
	}

	newThis.z = z;
	newThis.is2 = is2;
	return newThis;
}
exports.Child = Child;


if (TEST) {
	// cannot use inheritance of conditional inheritance,
	// only unparactilall solutio is for every sub Class to have separate prototype obj for every condition combination.
	function SubChild(is2, a1, a2, z) {
		if (!(this instanceof SubChild)) return new SubChild(is2, a1, a2, z);
		Child.call(this, is2, a1, a2, z);
	}
	SubChild.prototype.getZ = function () {
		return this.z;
	}
	exports.SubChild = SubChild;

	let err;
	try {  new SubChild(true, 1, 2, 3);  } catch (e) { err = e; }
	console.assert(err && err instanceof TypeError, 'calling SubChild expected to throw TypeError', {err});
}

//Object.setPrototypeOf(Child.prototype, Parent1.prototype); // if no conditional inheritance

//Object.setPrototypeOf(Child.prototype, null);
//delete Child.prototype; // not allowed by js, returns false
Child.prototype = null; // no own poto, used condition
// NOTE:
// setting proto to null will cause error from `obj instanceof Child`
// 'TypeError: 'prototype' property of Child is not an object'

Child.prototype_inherits_Parent2 = { constructor: Child, __proto__: Parent2.prototype };
Child.prototype_inherits_Parent1 = { constructor: Child, __proto__: Parent1.prototype };


if (TEST) {
	let err;
	try {
		// note: not expected `this.is2` to be the right prop to use.
		Object.defineProperty(Child, 'prototype', { // does not even work, `TypeError: can't redefine non-configurable property "prototype"`
			get: function() {
				debugger
				console.log(this, arguments);
				return this.is2 ? Parent2.prototype : Parent1.prototype;
			},
			set() {
				debugger
				console.log(this, arguments);
				return this.is2 ? Parent2.prototype : Parent1.prototype;
			}
		});
	} catch (e) { err = e; }
	console.assert(err && err instanceof TypeError, "expected JS defineProperty on 'prototype' to throw TypeError");
}



if (TEST) { // example
	var child1 = Child(false, 1, 2, 3);
	exports.child1 = child1;
	var child2 = new Child(true, 1, 2, 3); // note new will create Object that will not be used and return value is overwritten by return in `Child` constructor
	exports.child2 = child2;
	//Child.prototype.constructor = Child;

}

if (TEST) {
	///// only solution is to create separate functions that has proto to Parent1/2 (but this is pointless...)
	var Child_inherits_Parent1 = _=>_; Child_inherits_Parent1.prototype = Child.prototype_inherits_Parent1;
	exports.Child_inherits_Parent1 = Child_inherits_Parent1;
	var Child_inherits_Parent2 = _=>_; Child_inherits_Parent2.prototype = Child.prototype_inherits_Parent2;
	exports.Child_inherits_Parent2 = Child_inherits_Parent2;

	console.assert(child1 instanceof Child_inherits_Parent1);
	console.assert(child2 instanceof Child_inherits_Parent2);
}




}(_exports);
if (exports) {
	eval('var {'+Object.keys(exports)+'} = exports;');
	exports.__undefine = _=> eval( Object.keys(exports).map(a=>'delete '+a).join(', ') );
	// used as `$_._undefine()` to clear `window` object from global `var` definition
	// this however will not clear event or cached objects if any  (note: this file does not contain events)
}
exports || module.exports; // use as last eval value
}