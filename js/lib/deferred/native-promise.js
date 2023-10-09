
function Promise_Deferred() {
	var o, x;
	var p = new Promise((O, X) => (o = O, X = X));
	p.resolve = o;
	p.reject = x;
	return p;
}
