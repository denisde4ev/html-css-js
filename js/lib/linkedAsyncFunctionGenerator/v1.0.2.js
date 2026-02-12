

//var SynchronousPromise = require('synchronous-promise');


function isPromiseLike(p) { // not verry good check. more often will return true.
	return p ? typeof p.then === 'function' : false;
};


function linkedAsyncFunctionGenerator(arg1, ...args) { // pure vars
	var generator =
		typeof arg1 === 'function' ? arg1(...(args||[])) : // looks like generatorFulction (assuming its async)
		'next' in arg1 ? arg1 : // looks like generator
		// Symbol.iterator in arg1 ? arg1[Symbol.iterator]() :
		null
	;


	if (!(generator && 'next' in generator)) {
		throw new TypeError('could not get generator from first arg');
	}

	var result =
		this instanceof linkedAsyncFunctionGenerator
		? this
		: Object.create(linkedAsyncFunctionGenerator.prototype)
	;

	var _wrapperPromise_resolve;
	var _wrapperPromise_reject;
	var _wrapperPromise = new Promise((o,x)=>(_wrapperPromise_resolve=o,_wrapperPromise_reject=x));

	Object.assign(result, {
		_generator: generator, isBeforeFirstValue: true,
		_wrapperPromise: _wrapperPromise,
		// _generatorPromise: // for now no, no value, no promse
		next() {
			try {
				var r = linkedAsyncFunctionGenerator.prototype.next.apply(this, arguments);
			} catch (e) {
				delete this.next;
				_wrapperPromise_resolve(this._nextObj);
				return r;
			}
			delete this.next;
			_wrapperPromise_resolve(this._nextObj);
			return r;
		},
	});

	return result;
};

linkedAsyncFunctionGenerator.prototype.nextObj = function nextFunc() {

	if (this._executedNext) return this._nextObj; // already executed

	var nextPromise = this._generator.next();
	this._executedNext = true;

	var nextObj = Object.create(linkedAsyncFunctionGenerator.prototype);
	this._nextObj = nextObj;
	Object.assign(
		nextObj,

		{
			//value: nextObj.value, done: nextObj.done,
			_executedNext: false, //nextObj: null,

			// be "toxic"/(take over) to the end. // even after {done: true}
			_generator: this._generator,
			// wont be needed by .next(),
			// and not expected other in interal functios to need it, however set it for external access 
			// for next .next call

			// isBeforeFirstValue: false, no copy

			_generatorPromise: nextPromise,
		},
		//(
		//	isPromiseLike(nextPromise) ? { value: void 0, done: void 0, _generatorPromise: nextPromise } :
		//
		//	nextPromise // consider:! not a promise! consider throw error
		//),
	);

	var wrapperPromise = nextPromise.then(a => {
		nextObj.value = a.value;
		nextObj.done = a.done;

		return nextObj;
	});

	nextObj._wrapperPromise = wrapperPromise;


	// isBeforeFirstValue: no copy

	// proto:
	//nextPromise.next = this.next;
	//nextPromise.backToGenerator = linkedAsyncFunctionGenerator.prototype.backToGenerator;
	//nextPromise.backToNativeGenerator = linkedAsyncFunctionGenerator.prototype.backToNativeGenerator;


	return nextObj;
};

linkedAsyncFunctionGenerator.prototype.nextPromise = function() {
	var i = this.nextObj();
	return i._wrapperPromise;
};

linkedAsyncFunctionGenerator.prototype.next = function() {
	return this.nextPromise();
};



//if (0)
{ // extra functionality

//var FunctionGenerator_proto = Object.getPrototypeOf({*_(){}}._);
//var GeneratorTmp_proto = Object.getPrototypeOf({*_(){}}._()); // NOTE: if created new, will not be equal `Generator_proto !== GeneratorTmp_proto` idk why, maybe history

//if (0)
linkedAsyncFunctionGenerator.prototype.prepend = function(val) {
	// seems works fine, but still unshure if works the way it should?
	// todo/consider: more debug

	var i = this;

	var p ;
	var pwrap;
	var iprev = Object.create(linkedAsyncFunctionGenerator.prototype);
	Object.assign(iprev, {
		_executedNext: true,
		_generator: i._generator,
		_nextObj: i,
	});




	if (isPromiseLike(val)) {
		p = val;
		pwrap = p.then(function thenFn(val) {
			if ( (typeof val === 'object' || typeof val === 'function') && 'value' in val ) val = val.value;
			iprev.value = val;
			//iprev.done = false;
			//val = { value: val, done: false}; // better dont
			// better dont, just expect value as object (dont check value prop)
			//var isGeneratorResult = 'value' in a;
			//var val = isGeneratorResult ? a.value : val;

			return iprev;
		});
	} else {
		p = Promise.resolve(val);
		pwrap = Promise.resolve(iprev);
		//thenFn(val);
		iprev.value = val;
	}

	Object.assign(iprev, {
		/*value: val,*/ done: false,
		_generatorPromise: p,
		_wrapperPromise: pwrap,
		// isBeforeFirstValue: no copy
	});


	return iprev;
};

if (0)
// todo:!!! check line by line, this fn was written before rewriting for asyncFunctionGenerator
linkedAsyncFunctionGenerator.prototype.backToGenerator = function() {
	var i = this;

	if (i.isBeforeFirstValue === true) {
		//i = i.next(); // if we are not prepending
	} else {
		//i = {next: function(){ return this}.bind(i)} // EZ-FIX: prepend one
		i = i.prepend();
	}

	// consider: Object.create(GeneratorTmp_proto);

	return {
		next: () => i = i.next(),
		[Symbol.iterator]: function() { return this; },
	}
};

}

if (0)
// todo:!!! check line by line, this fn was written before rewriting for asyncFunctionGenerator
linkedAsyncFunctionGenerator.prototype.backToNativeGenerator = function *() {
	var i = this;

	if (i.isBeforeFirstValue === true) i = i.next();

	while (!i.done) {
		yield i.value;
		i = i.next();
	}
	return i.value;
};


// note:
// idk/not checked if .backToAsyncFunctionGenerator().return() called
// and seems like will not call back the lower level fn to .return or to stop,
// idk if this will lead to memory leak. too lazy to check,
// I'll fix it if this only when becomes problem
if (0)
// todo:!!! check line by line, this fn was written before rewriting for asyncFunctionGenerator
linkedAsyncFunctionGenerator.prototype.backToNativeAsyncGenerator = async function *() {
	var i = this;

	if (i.isBeforeFirstValue === true) i = i.next();

	var j;
	for (;;) {
		if (i.done) break; // expected to never get .done = true
		j = i.value;
		
		if (j instanceof Promise) j = await j;
		if (j.done) break;

		yield j.value;


		i = i.next();
	}

	return j.value;
};




if (typeof module !== 'undefined') module.exports = linkedAsyncFunctionGenerator;





;
if (0)
// todo:!!! check line by line, this block of code was written before rewriting for asyncFunctionGenerator

if (0) // test // main test
(()=>{


	var A_wait = () => {
		new Promise((o,x) => {
			_aaa.resolve = o;
			_aaa.reject = x;
		}).finally(a => {
			console.log('nulling _aaa.resolve');
			_aaa.resolve = null;
			_aaa.reject = null;
		})
	};

	async function *A() {
		//yield 0;
		yield 1;
		yield 2;
		yield 3;

		yield await A_wait();
		yield 4;
		yield await A_wait();
		yield 5;
		yield await A_wait();
		yield 6;
		yield await A_wait();
		yield 7;
	}
	var _aaa = A();
	var aaa = linkedAsyncFunctionGenerator(_aaa);
	var aaa1 = aaa.nextObj();
	var aaa2 = aaa1.nextObj();
	var aaa3 = aaa2.nextObj();
	var aaa4 = aaa3.nextObj();
	var aaa5 = aaa4.nextObj();
	var aaa6 = aaa5.nextObj();
	var aaa7 = aaa6.nextObj();
	var aaa8 = aaa7.nextObj();
	var aaa9 = aaa8.nextObj();





	var aaa_r1 = function reduce(a) {
		var r = [];
		//let a = aaa;
		if (!a._executedNext) return r;
		//if (a.isBeforeFirstValue) a = a._nextObj;
		for (;;) {
			//console.log(a);
			r.push(a);
			if (!a._executedNext) break;
			a = a._nextObj; // next
		};

		return r;
	}(aaa);

	var aaa_r2 = function(arr, cb) {
		var r = arr.map(a => a&&a._generatorPromise);
		r.forEach((a, i, arr) => {
			arr[i] = a;
			if (!(a && a.then)) return;
			var f = a => { arr[i] = a.value; };
			a.then(f).catch(f);
		});
		return r;
	}(aaa_r1);

	console.table([aaa_r1, aaa_r2]);
	setTimeout(()=> console.table([aaa_r1, aaa_r2]), 1);



	// -----
	//


})();










linkedAsyncFunctionGenerator; // as last val for eval
