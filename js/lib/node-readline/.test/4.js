#!/usr/bin/env node


// expected `input` to be `process.stdin`
function Readline(input, opt) {
	if (!(this instanceof Readline)) {
		return new Readline(input, opt);
	}
	if (!opt) opt = {};
	this.callOnEmptyEOF =
		opt.callOnEmptyEOF == null
		? true
		: opt.callOnEmptyEOF
	;
	this.onLine = opt.onLine;
	this.onEnd  = opt.onEnd;

	input.setEncoding('utf8'); // todo: check if this is needed

	var buff = '';
	input.on('data', dStr => { // dStr = data
		dStr += ''; // toString

		var dStrI;
		dStrI = dStr.indexOf('\n');
		if (!( 0 <= dStrI )) {
			buff += dStr;
			return;
		}
		var currentString = buff + dStr.substr(0, dStrI);
		buff = '';
		this.onLine(currentString, '\n');
		dStr = dStr.substr(dStrI + 1);

		for (
			;
			dStrI = dStr.indexOf('\n'),
			0 <= dStrI
			;
			dStr = dStr.substr(dStrI + 1)
		) {
			this.onLine(dStr.substr(0, dStrI), '\n');
		}
		buff += dStr;
	});
	input.on('end', () => {
		//if (!buff) return;
		// note: if (!buff) then we could just skip calling `.next()`, however fn might want to handle end of input
		// other way is to have Readline constructor option, but for the sick of simplicity leave it this way.
		//  `It` should check if .nl and .line are both empty for end of input
		//   + then check before next iteration if .nl is empty and not trigger `yield`

	
		if (this.onLine) {
			if (!(
				opt.noEOF || (
					!buff && !opt.callOnEmptyEOF
				)
			))
			this.onLine(buff, '');
		}
		if (this.onEnd) this.onEnd();
	});
}


if (false) // test: `nl` from Linux coroutils
if (require.main === module) {
	var i = 0;
	new Readline(process.stdin, {
		callOnEmptyEOF: false,
		onLine(line, nl) {
			//if (!d.nl && !d.line) return; // no need to check when `callOnEmptyEOF=true`
			i++;

			process.stdout.write( i + ' ' + line  + nl );

			//if (!d.nl) return;
		},
		onEnd() {
			if (i === 0) {
				// stderr note:
				process.stderr.write('(empty input)\n');
			}
		},
	});
}
