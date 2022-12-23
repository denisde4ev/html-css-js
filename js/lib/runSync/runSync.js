
var runSync = cb => {
	var restore_isAsync = window.isAsync;
	window.isAsync = false;
	try {
		var returnedValue = cb(false);
	} catch (e) {
		window.isAsync = restore_isAsync;
		throw e;
	}
	window.isAsync = restore_isAsync;
	return returnedValue;
}


// Example:
//(window.runsync||(f=>f(!1)))(isAsync=>{
// code...
//})
