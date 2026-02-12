void function() {
	console.log('mySyncCircularLib self requiring');
	var l = req('mySyncCircularLib', false);
	console.log('mySyncCircularLib self loaded', l) // impossible
	return l;
}();

module.exports = 2;