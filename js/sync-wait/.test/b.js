// globals, redeclarable in DevTools
var noopSleep_ping = 0;         // will hold the running average
var noopSleep_pingSamples;  // will count how many pings we’ve made

function noopSleep(ms, since) {
	ms |= 0;

	var took = 0;

	if (since === void 0) since = Date.now();

	if (noopSleep_ping == null && ms !== 0) {
		let msFirstRun = noopSleep(0); // just set the ping
		// ms -= msFirstRun; // idk, it should not be needed?
	}

	// fire one sync‐XHR to a delay endpoint
	var xhr = new XMLHttpRequest();
	var url = `https://httpbin.org/delay/${( (ms - (noopSleep_ping || 0) ) / 1e3 ) | 0}`;
	xhr.open('GET', url, false);
	xhr.send(null);

	// measure this round‐trip
	var now = Date.now();
	var ping = now - since - ms;

	if (ping < 0) {
		return noopSleep(ping * -1); // todo: check if this is correct, and do we need since var, and what should it be
	} // note: should not be possible to get this in case when `ms = 0` is it ?

	// todo: check variables what I have done... is the ping correct, because we round down in url... or it might return faster
	if (!noopSleep_pingSamples) {
		noopSleep_pingSamples = 1;
		noopSleep_ping = ping;
	} else {
		// increment count
		noopSleep_pingSamples++;
		// update average with new value:
		//  newAvg = (oldAvg * (n-1) + ping) / n
		noopSleep_ping = (
			noopSleep_ping * (noopSleep_pingSamples - 1) +
			ping
		) / noopSleep_pingSamples;
	}

	if (ms === 0) return ping;


	// return the ping for this call if you need it,
	// or return noopSleep_ping to see the cumulative average
	return ping;
}

debugger

console.log( noopSleep(2e3, Date.now()) );

console.log( noopSleep(10e3, Date.now()) );
