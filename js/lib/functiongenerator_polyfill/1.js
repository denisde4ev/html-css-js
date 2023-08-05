
var FunctionGenerator;

if (0)
try{
	var FunctionGenerator = eval('(function*(){}).constructor');
	console.info(
		'this js engine don\'t need FunctionGenerator_fix , '+
		'using this fix might even fail on new systems!'+
	'');
}catch(e){}

function FunctionGenerator_fix(arg1) {
	if (typeof arg1 !== 'function' && typeof arg1 !== 'object')
}

if (typeof module !== 'undefined')
module
	.exports
	.FunctionGenerator_fix
=
	FunctionGenerator_fix
;
