
var D;
if (typeof req === 'function') {
	// browser req from: https://github.com/denisde4ev/html-css-js/tree/master/js/lib/req/
	let url = 'https://cdn.jsdelivr.net/gh/denisde4ev/html-css-js/js/lib/deferred/deferred.js';
	req(url, true); // start async request.
	D=_=>(D=req(url).D)(); // gets if loaded else starts sync load.
} else if (typeof	require === 'function') {
	// nodejs require
	D = require('/^/ https://github.com/denisde4ev/html-css-js/raw/master/js/lib/deferred/deferred.js').D;
} else {
	// when test: test example output is using this D implementation + uncomment debug line
	D = d => ( // d = simplest deferred + .then resolved, no catch/reject
		d=[],
		d.then=d.push,
		//d.then = function (cb) { if (d.done) console.error('bad .then call'); this.push(cb); return this; }, // debug
		d.resolve=a=>{d.then=f=>a=f(a);d.forEach(f=>a=f(a))},
		//d.resolve=a=>{ d.then=f=>a=f(a); d.done = true; d.forEach(f=>a=f(a)); d.length=0; }, // debug
		d
	);
}

function FG2A(It) { // FG2A = functionGenerator to await
	var it = typeof It === 'function' ? It() : It;
	var mainDeferred = D({callOnce:true});

	var promiseThenCb = data => { // d = data
		itWhenResolved( it.next( data ) );
		return data;
	};
	var promiseCatchCb = data => { // d = data
		itWhenResolved( it.throw( data ) );
		return data;
	};
	var itWhenResolved = it_odata => {
		var val = it_odata.value;

		if (it_odata.done) {
			mainDeferred.resolve(val);
			return;
		}

		if (!(val && typeof val.then === 'function')) {
			// throw new Error('UNDECIDED + UNIMPLEMENTED');

			itWhenResolved( it.next( val ) );
			// assuming `rv = yield* subIt()` was called
			//  in this case returne value to `yield` should be value itself.
			return;
		}

		val.then(promiseThenCb);
	};

	// it_odata = iterator output data
	var it_odata = it.next(); // note: "the first value sent through `next` is lost", doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next#:~:text=the%20first%20value%20sent%20through%20%60next%60%20is%20lost
	itWhenResolved(it_odata);

	return mainDeferred;
}

if (typeof module !== 'undefined') module.exports.FG2A = FG2A;





if (false) // test:
(log=>{
	var promise = D();
	// test case1:
	//log('-resolving promise'); promise.resolve('start with resolved promise');
	var fn_promise = FG2A(function*() {
		log('fg begin');

		var data = yield promise;
		log('fg data: ' + data);

		return 'fg return';
	});

	void async function() {
		log('async begin');

		var data = await fn_promise;
		log('async data: ' + data);

	}();

	var _fn_promise2 = FG2A(function*() {
		log('fg2 begin');

		var data = yield fn_promise;
		log('fg2 data: ' + data);
	});

	// test case 2:
	log('-resolving promise'); promise.resolve('after no timeout'); // expected to miss async resolve (this is the reason I want to avoid using async)

	// test case 3:
	//setTimeout(_=> void log('-resolving promise') || promise.resolve('after 5 seconds'), 5e3);

	log('-main end');
})(console.log);
// # Output:
//
// ## case 1: 'start with resolved promise'
//```
//-resolving promise
//fg begin
//fg data: start with resolved promise
//async begin
//fg2 begin
//fg2 data: fg return
//-main end
//async data: fg return
//```
// here async is executed on next event loop
//
// ## case 2: 'after no timeout'
//```
//fg begin
//async begin
//fg2 begin
//-resolving promise
//fg data: after no timeout
//fg2 data: fg return
//-main end
//bad .then call
//```
// here we do not get async ever resolved. and we got 'bad .then call'.
//  the problem here is in my deferred implementation:
//  I'm reasigning .then when promise gets resolved, but native await caches the old `.then` fn.
//  -> meaning that I cannot event detect if there will be more .then calls from async keyword before "-main end"
//
// ## case 3: 'after 5 seconds'
//```
//fg begin
//async begin
//fg2 begin
//-main end
//-resolving promise
//fg data: after 1 sec
//fg2 data: fg return
//async data: fg return
//```
// here async is executed on next event loop



if (false) // test2: example using `yield*`:
(log=>{
	var delay = (str, t) => new Promise(r => setTimeout(_ => r(str), t));
	var fn_promise = FG2A(function* outer() {
		function* inner() {
			log( yield delay('inner1', 1e3) );
			return 'inner return';
		}

		log( yield delay('outer begin', 2e3) );
		log( 'inner rv: ' + (yield* inner()) );

		// side effect of keeping returned value from `yield*`:
		console.assert('123' === (yield '123'));
		console.assert(void 0 === (yield* '123'));

		log( yield delay('outer end', 1e3) );
	});
	log('-main end');
})(console.log);
// Output:
//```
//-main end
//outer begin
//inner1
//inner rv: inner return
//outer end
//```
