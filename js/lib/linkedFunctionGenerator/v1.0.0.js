
// NOTE:!!! no support for asyncFunctionGenerator.
// check newer versions?


function linkedFunctionGenerator(genFunc, ...args) { // pure vars
	var generator =
		typeof genFunc === 'function' ? genFunc(...(args||[])) :
		'next' in genFunc ? genFunc :
		Symbol.iterator in genFunc ? genFunc[Symbol.iterator]() :
		null
	;

	if (!(generator && 'next' in generator)) {
		throw new TypeError('first argument must be generator function');
	}


	// // Recursively wrap each result
	// function wrap(o, generator) { // unpure // pure vars
	// 	o.next = nextFunc;
	// 	o.generator = generator;
	// 
	// 	return o;
	// }

	//return { next: function() { return wrap(this.generator.next()) }, generator: generator };

	var result =
		this instanceof linkedFunctionGenerator
		? this
		: Object.create(linkedFunctionGenerator.prototype)
	;

	Object.assign(result, { generator: generator, isBeforeFirstValue: true });
	//return { next: nextFunc, generator: generator }

	return result;
	//function(){ return wrap(this.generator.next()) }, generator: generator };
}

linkedFunctionGenerator.prototype.next = function nextFunc() { // pure vars
	//console.log('this', this);

	if (this.executedNext) return this.nextObj; // already executed

	var nextObj = this.generator.next();
	this.executedNext = true;

	nextObj = Object.assign(
		Object.create(linkedFunctionGenerator.prototype),

		{
			//value: nextObj.value, done: nextObj.done,
			executedNext: false, //nextObj: null,
			generator: this.generator, // wont be needed by .next(), and not expected other in interal functios to need it, however set it for external access 
			// isBeforeFirstValue: no copy
		},
		nextObj, // expect to get only {value,done}
	);

	// be "toxic"/(take over) to the end. // even after {done: true}
	nextObj.generator = this.generator; // for next .next call
	// isBeforeFirstValue: no copy

	// proto:
	//nextObj.next = this.next;
	//nextObj.backToGenerator = linkedFunctionGenerator.prototype.backToGenerator;
	//nextObj.backToNativeGenerator = linkedFunctionGenerator.prototype.backToNativeGenerator;
	

	return this.nextObj = nextObj;
};


if (0) { // extra functionality

//var FunctionGenerator_proto = Object.getPrototypeOf({*_(){}}._);
//var GeneratorTmp_proto = Object.getPrototypeOf({*_(){}}._()); // NOTE: if created new, will not be equal `Generator_proto !== GeneratorTmp_proto` idk why, maybe history

linkedFunctionGenerator.prototype.prepend = function(val) {
	let i = this;
	//i = { next: function(){ return this}.bind(i), value: val };
	i = Object.assign(Object.create(linkedFunctionGenerator.prototype), {
		value: val, done: false,
		executedNext: true, nextObj: i,
		generator: i.generator, // wont be needed by .next(), and not expected other in interal functios to need it, however set it for external access 
		// isBeforeFirstValue: no copy
	});
	return i;
};

linkedFunctionGenerator.prototype.backToGenerator = function() {
	let i = this;

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


linkedFunctionGenerator.prototype.backToNativeGenerator = function *() {
	var i = this;

	if (i.isBeforeFirstValue === true) i = i.next();

	while (!i.done) {
		yield i.value;
		i=i.next();
	}
	return i.value;
};


}


if (typeof module !== 'undefined') module.exports = linkedFunctionGenerator;





if (0) // test
{

	function *A () { let i; for (i = 0; i < 10; i++) yield i; return i; }

	let a = linkedFunctionGenerator(A());
	let a3 = a;
	let a2 = a;

	console.log('novalue a:', a);


	a = a.next();
	let b = a;
	console.log('value:0 a=b:', a);

	console.log('value:1 a:', a=a.next());
	console.log('value:2 a:', a=a.next());
	
	console.log('value:1 b:', b=b.next());
	console.log('value:2 b:', b=b.next());
	console.log('value:3 b:', b=b.next());

	console.log('value:3 a:', a=a.next());

	console.log('novalue a2:', a2);
	console.log('value:0 a2:', a2 = a2.next());
	console.log('value:1 a2:', a2 = a2.next());


	//if (0) // test does not work
	{
		// for the result it shouldn't matter if native or not
		console.log('a3', [...a3.backToNativeGenerator()]);
		console.log('a', [...a.backToGenerator()]);
		console.log('b', [...b.backToNativeGenerator()]);
		console.log('a2',[...a2.backToGenerator()]);
	}


	function getOne() {return 1;}
	function getTwo() {return 2;}
	function getThree() {return 3;}

	function myFunc() {
		let step = 0;

		return {
			[Symbol.iterator]() {
				return {
					next() {
						step++;
						if (step === 1) return { value: getOne(), done: false };
						if (step === 2) return { value: getTwo(), done: false };
						if (step === 3) return { value: getThree(), done: false };
						return { value: undefined, done: true };
					}
				};
			}
		};
	}

	// todo write the tests for this, but seems fine
	let d = linkedFunctionGenerator(myFunc());
	console.assert((d.next().value))



	// ai: (NEVER TESTED)

	// A simple generator function
	function* countUpTo(n) {
		for (let i = 1; i <= n; i++) {
			yield i;
		}
	}

	// Wrap it
	var linkedCount = linkedFunctionGenerator(countUpTo, 3);

	console.log(linkedCount); 
	// { value: 1, done: false, next: [Function] }

	var second = linkedCount.next();
	console.log(second);        
	// { value: 2, done: false, next: [Function] }

	var third = second.next();
	console.log(third);         
	// { value: 3, done: false, next: [Function] }

	var doneNode = third.next();
	console.log(doneNode);      
	// { value: undefined, done: true, next: [Function] }

	
}










linkedFunctionGenerator; // as last val for eval
