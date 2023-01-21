#!/usr/bin/env node

// use at own risk. I have not testend if wosk well.
// I just got it to work and started using it.


var Readline = module.exports.Readline = function() {
	if (!(this instanceof Readline)) return new Readline();

	process.stdin.setEncoding('utf8');

	this.d = [];
	this.nl = {__proto__:null}; // init with non stringable obj
	var buff = [];

	process.stdin.on('data', dStr => {
		dStr += ''; // dStr = data string // toString

		var dStrI;
		dStrI = dStr.indexOf('\n');
		if (!( 0 <= dStrI )) {
			buff += dStr;
			return;
		}

		var currentString = buff + dStr.substr(0, dStrI);
		buff = '';
		this.nl = '\n';
		this.resolve(currentString);
		dStr = dStr.substr(dStrI + 1);


		for (
			;
			dStrI = dStr.indexOf('\n'),
			0 <= dStrI
			;
			dStr = dStr.substr(dStrI + 1)
		) {
			currentString = dStr.substr(0, dStrI);
			this.resolve(currentString);
		}
		//console.log('end dStr:'+dStr);
		buff += dStr;

	});
	process.stdin.on('end', () => {
		this.nl = '';
		this.resolve(buff, true);
	});
};
Readline.prototype.resolve = function(data, end) {
	var d = this.d;
	this.d = end ? null : [];
	d.forEach(fn => {
		try { fn(data); } catch (e) { console.error(e); }
	});
}
Readline.prototype.then = function(cb) {
	this.d.push(cb);
};


// test: `nl`
if (require.main === module) void async function(){
	var readline = new Readline();
	for (
		var line, i = 0;
		( readline.d && ( i++, line = await readline ) )
		;
	) {
		process.stdout.write( i + ' ' + line  + readline.nl);
	}

}();
