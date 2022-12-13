await (_=>{
	let pr = {
		_cb: [],
		then(cb){
			this._cb.push(cb);
		}
	};
	setTimeout(_=>{
		console.log('will call: ', pr._cb, pr._cb.length)
		pr._cb.forEach(fn=>fn.call(this));
	},100 );
	return pr;
})()
