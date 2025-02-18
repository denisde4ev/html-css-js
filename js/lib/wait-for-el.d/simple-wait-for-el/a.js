
// not well tested

var waitForElement = fn => new Promise((o,x) => {
	var el = fn();
	if (el) return o(el);
	var timesLeftToCheck = (30e3 / 200); // at 30s rejects the promise

	var intervalId = setInterval(() => {
		var el = fn();
		if (el) {
			clearInterval(intervalId);
			return o(el);
		}

		time -= 1; if (time < 0) {
			clearInterval(intervalId);
			return x(['time is up, cant find element, for 30s', fn]);
		}
	}, 200);
};


// usage: `await waitForElement( () => document.querySelector() );
