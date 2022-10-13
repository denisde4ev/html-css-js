
function syncHTTPGet(url) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, false); // false => sync request
	xhr.send({});

	let s = xhr.status;
	xhr._ok = s === 0  || 200 <= s && s < 400;

	return xhr;
}
