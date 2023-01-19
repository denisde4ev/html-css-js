
if (window.fetch) { 
req = async name => {
	if (name.endsWith('.js')) name = name.slice(0,-3); 

	if (req.loaded[name]) {
		console.warn(new Error('lib used multiple time: '+name));
		return req.loaded[name];
	}

	var code = await (await fetch(req.basepath + '/' + name + '.js').text())
	return req.loaded[name] = req.evalmodule(code);
};
} else {
req = async name => {
	if (name.endsWith('.js')) name = name.slice(0,-3); 

	if (req.loaded[name]) {
		console.warn(new Error('lib used multiple time: '+name));
		return req.loaded[name];
	}

	var code;
	{
		let x = new XMLHttpRequest();
		x.open('GET', req.basepath + '/' + name + '.js', true);
		x.send();
		if (x.status !== 200) throw new Error('module req HTTP status: '+x.status, { x, name });
		var code = x.responseText;
	}


	return req.loaded[name] = req.evalmodule(code);
};
}



req.evalmodule = code => {
	var _givenexports = {}, module = {exports: _givenexports};
	var returnedValue = Function('module', code)(module);

	return (
		 _givenexports !== module.exports ||
		 0 < Object.keys(module.exports).length
		 	? module.exports
		 	: returnedValue
	);
};

req.loaded = {};
req.basepath = {__proto__: null}; // must be defined


req.get = function(name) {
	//if (name.endsWith('.js')) name = name.slice(0,-3);
	if (Object.hasOwn(this,name)) {
		return this.loaded[name];
	}

	console.warn('req.get is acsessing missing lib');

	var x = new XMLHttpRequest();
	x.open('GET', req.basepath + '/' + name + '.js', false);
	x.send();
	if (x.status !== 200) throw new Error('module req HTTP status: '+x.status, { x, name });
	var code = x.responseText;

	return req.loaded[name] = req.evalmodule(code);
};


req
