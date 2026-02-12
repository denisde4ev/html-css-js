void function() {
	console.log('myAsyncCircularLib self requiring');
	return req('myAsyncCircularLib').then(l => {
		console.log('myAsyncCircularLib self loaded', l) // impossible
		return l
	});
}();

module.exports = 222;
