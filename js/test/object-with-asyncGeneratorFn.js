console.log(1);

void await async function () { console.log(
	+(await { async *[0](b){yield* '2...'} }[0]().next()).value
); } ();


console.log(3);


(async ()=>{
	var o = {
		fn: async function *fn(b) {
			yield 4;
		}
	};
	var asyncGeneratorFunction = o.fn;
	var asyncGenerator = asyncGeneratorFunction();
	var iterPromise = asyncGenerator.next();
	var result = await iterPromise;
	var value = result.value;
	console.log( value );
})();


console.log(5);
6;
