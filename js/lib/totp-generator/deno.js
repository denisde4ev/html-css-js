#!/usr/bin/env -S deno run --allow-net


import totpGenerator;

if (import.meta.main) {

	var jsEngine =
		typeof Deno    !== 'undefined' && typeof Bun === 'undefined' ? 'deno' :
		typeof Bun     !== 'undefined' ? 'bun' :
		typeof process !== 'undefined' && process.versions && process.versions.node ? 'nodejs' :
		typeof window  !== 'undefined' ? 'browser' :
		null
	;

	console.log('this is', jsEngine, typeof Bun);


	var prompt; // define promptit to tty
	{
		if (jsEngine === 'browser') {
			prompt = window.prompt;
		} else {
			if (jsEngine === 'deno') {
				var writeStderr = str => Deno.stderr.write(new TextEncoder().encode(str));
				var readStdin = async () => new TextDecoder().decode(await Deno.readAll(0));
				var isTty = i => Deno.isatty(i);
			} else if (jsEngine === 'nodejs' || jsEngine === 'bun') {
				var fs = require('fs');
				var writeStderr = str => fs.writeFileSync(1, str);
				var readStdin = () => fs.readFileSync(0) +''; // TODO: FIXME: currently in nodejs gives error
				var isTty = i => process[['stdin','stdout','stderr'][i]].isTTY;
			} else {
				throw new Error('unimplementde prompt fn for this js engine');
			}

			prompt = async function(txt) {
				if (isTty(0)) await writeStderr(txt);
				return await readStdin();
			}
		}
	}



	console.log(totpGenerator(await prompt('enter TOT [^D for EOF]:')));

}
