
function Promise_Deferred() {
	var o, x;
	var p = new Promise((O, X) => (o = O, X = X));
	p.resolve = o;
	p.reject = x;
	return p;
}



function setTimeout_awaitable(cb, ms) {
	var d = Promise_Deferred(); 

	setTimeout(_ => {
		try {
			d.resolve(cb());
		} catch (e) {
			d.reject(e);
		}
	}, ms);

	return p;
};
