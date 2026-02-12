

console.log(`document.readyState=${document.readyState}`);
console.assert(document.readyState === "loading", "Expected 'loading' before any events");

document.addEventListener("DOMContentLoaded", () => {
	console.log(`document.readyState=${document.readyState}`);

	console.assert(document.readyState === "interactive", "Expected 'interactive' at DOMContentLoaded");
	// debugger;
});

window.addEventListener("load", () => {
	console.log(`document.readyState=${document.readyState}`);

	console.assert(document.readyState === "complete", "Expected 'complete' at window.load");
	// debugger;
});




// or count event loops up to "complete":
let max_i = 20_000_000;
{
	let i = 0;
	let myInteval;
	let run = () => {
		console.log(`document.readyState=${document.readyState}, i=${i}`);
		if (document.readyState === "complete") {
			return false;
		}

		i++;
	};

	let run2 = () => {
		if (run() === false) return;

		if (!--max_i) throw max_i;

		Promise.resolve().then(run2);
	};

	if (0)
	setTimeout(_=>{ // only needed when executed in devtools/F12
	// I GOT MY BROWSER FRIZE PROCESSES!, do no try without setTiimeout if you are not ready to reboot
		run2();
	});
};












// (old) or count event loops (old: setTimeout) up to "complete":
if (0)
{
	let i = 0;
	let myInteval;
	let run = () => {
		console.log(`document.readyState=${document.readyState}, i=${i}`);
		if (document.readyState === "complete") {
			clearInterval(myInteval);
			return;
		}

		i++;
	};

	run();
	myInteval = setInterval(run);
};


// old:
i=0;
setTimeout(function R() {
	console.log(++i);
	debugger
	if (document.readyState !== "interactive") setTimeout(R);
});

