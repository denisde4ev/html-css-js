
var D = d => ( // to minify just remove identation + NLs
	d=[],
	d.then=d.push,
	d.resolve=(...a)=>d.forEach(f=>f(...a)),
	d
);
if (typeof module !== 'undefined') module.exports.D=D;


// example of skiping `D` function
// and itegrating to your fn (that is fn "sleep" in this example):
if (false) {
	let sleep = t => {
		var d=[]; d.then=d.push; // <-- init
		setTimeout(_=>{
			d.forEach(f=>f()); // <-- resolve
		},t);
		return d;
	};


	console.log('start');

	// await internally calls `sleep(..).then(fn () { [native code] })`
	await sleep(5e3); // <-- await

	console.log('5 seconds have passed' /*5 or more*/);
}
