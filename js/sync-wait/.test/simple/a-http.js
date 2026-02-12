// globals, redeclarable in DevTools
var noopSleep_ping = 0;         // will hold the running average
var noopSleep_pingSamples;  // will count how many pings we’ve made

function noopSleep(ms) {
	ms |= 0;


	// since its simple:
	// only one request,
	// if server returned early,
	// then they are to blame


	// fire one sync‐XHR to a delay endpoint
	var xhr = new XMLHttpRequest();
	var url = `https://httpbin.org/delay/${( ms / 1e3 ) | 0}`;
	xhr.open('GET', url, false);
	{
		var since = Date.now();
		xhr.send(null);
		var now = Date.now();
	}

	// measure this round‐trip
	var offset = now - since - ms; 

	return offset;
}

debugger

console.log( noopSleep(2e3) );

console.log( noopSleep(10e3) );
