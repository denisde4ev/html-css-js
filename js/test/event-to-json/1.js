document.addEventListener('click', function(event){ debugger

var a=event;

var keys = new Set();
keys.addMany = function(a) {
	for (let i of arguments.length === 1 && a && Object.hasOwn(a,'length') && typeof a !== 'string' ? a : arguments) {
		this.add(i);
	}
}
for (let i = a; i; i = Reflect.getPrototypeOf(i)) {
	keys.addMany( Reflect.ownKeys(i) );
}

keys = Array.from(keys).filter(key=>{
	if (typeof key === 'symbol') return false;
	if (typeof a[key] === 'symbol') return false;

	console.assert(key in a, 'key is not in a, key:' + key);
	console.assert(Reflect.has(a, key), 'a has not key, key:' + key);


	try { JSON.stringify(a[key]); return true; }
	catch (e) { console.info('cannot convert to JSON, key: '+key); return false; }
})

var o = {};
for (let key of keys) {
	o[key] = a[key];
}

console.log(JSON.stringify(o));

})