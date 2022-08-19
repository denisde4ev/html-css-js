
function* range(start, end, increment) {
	if (start       === undefined) start     = 1;
	if (end         === undefined) end       = Infinity;
	if (increment   === undefined) increment = 1; else increment = Math.abs(increment);

	let i;
	if (start < end) {
		for (i = start; i <= end; i += increment) {
			yield i;
		}
	} else {
		console.log(end, start , increment)
		for (i = start; end <= i; i -= increment) {
			console.log(i)
			yield i;
		}
	}

}
