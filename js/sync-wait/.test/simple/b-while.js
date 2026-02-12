/*
/* Blocks the main thread for the specified number of milliseconds.
/*
/* @param {number} ms – Time to block in milliseconds.
/*/
function blockMainThread(ms, since) {
	since ??= performance.now();
	var now;
	do {
		now = performance.now();
	} while (now < (since + ms));

	return now - since + ms;
}



//debugger
var since = performance.now();
// Usage example:
for (let i of [...'0123456789ABCD']) {
	console.log(i, blockMainThread(1e3, since));
	since += 1e3;
}

console.log(1)
