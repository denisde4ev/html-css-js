#!/usr/bin/env node

// use at own risk. I have not testend if wosk well.
// I just got it to work and started using it.

// NOTE: IDK what will happen if you call Readline twice and I'll probably never test it.

// my goal is to not use async/await.
// because await sometimes misses event loop and gets executed in next event loop:
//  that means if all 'data'events happen before await gets executed once
//  I have to store entire data untill next loop
//  and sometimes this means entire data, so the point of using promises loses its purpose.


var Readline = module.exports.Readline = function(It) {
	if (!(this instanceof Readline)) return new Readline(Fg);

	process.stdin.setEncoding('utf8');

	// It = functionGenerator (sync, but pauses are controlled by Readline => weird async/await alternative with no event loop misses)
	var it_data  = {__proto__:null}; // obj but faster
	it_data.line = {__proto__:null}; // init with non stringable obj
	it_data.nl   = {__proto__:null}; // init with non stringable obj
	var it = It(this, it_data);
	var it_callNext = function(line, nl) {
		it_data.line = line;
		it_data.nl = nl;
		return it.next(/*it_data*/);
	};

	var buff = '';

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
		it_callNext(currentString, '\n');
		dStr = dStr.substr(dStrI + 1);

		for (
			;
			dStrI = dStr.indexOf('\n'),
			0 <= dStrI
			;
			dStr = dStr.substr(dStrI + 1)
		) {
			it_callNext(dStr.substr(0, dStrI), '\n');
		}
		buff += dStr;
	});
	process.stdin.on('end', () => {
		//if (!buff) return;
		// note: if (!buff) then we could just skip calling `.next()`, however fn might want to handle end of input
		// other way is to have Readline constructor option, but for the sick of simplicity leave it this way.
		//  `It` should check if .nl and .line are both empty for end of input
		//   + then check before next iteration if .nl is empty and not trigger `yield`

		if (!it_callNext(buff, '').done) console.warn('funtionGenerator did not got done on nl=""');
		// end is expected to be called only once.
		// in case `!readline.nl` the functionGenerator should return.
	});
};


// test: `nl` from Linux coroutils
if (require.main === module) {
	new Readline(function*(readline, d) {
		// d = data
		var i = 0;

		for (;;) {
			if (!d.nl && !d.line) break;
			i++;

			process.stdout.write( i + ' ' + d.line  + d.nl );

			if (!d.nl) break;
			yield;
		}
		if (i === 0) process.stderr.write('(empty input)\n'); // stderr note
	});
}

