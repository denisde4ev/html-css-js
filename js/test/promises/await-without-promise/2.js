await (_=>{
	let d = []; d.then=d.push;

	setTimeout(_=>{
		//d.then=fn=>fn('returned value')
		for(let f of d)f('returned value');
	},100 );

	return d;
})()


// or in global scope
d = []; d.then=d.push;

setTimeout(_=>{
	//d.then=fn=>fn('returned value')
	for(let f of d)f('returned value');
},100 );

await d;
