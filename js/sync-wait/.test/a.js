


var noopSleep_ping
function noopSleep(ms, since) {
	ms|=0;

	if (noopSleep_ping == null) {
		// TODO: here
		noopSleep_ping = // TODO: here  // time of waiting
	}

	// var xhr = new XMLHttpRequest();
	// xhr.open("GET", `https://httpbin.org/delay/${ms / 1e3 |0}`, false);
	// xhr.send(null);  

	// todo: check if time have passed, else just recursion with direct same call `noopSleep(ms, since)`
	// do not detect if too many tries, leave native error to handle this

	// TODO: in case of http error (eather in ping or main wait), return false
}



