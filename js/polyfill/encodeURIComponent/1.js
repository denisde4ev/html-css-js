// AI src: https://www.phind.com/search/cm6x29bac0000206f2jec7dtr
 
function encodeURIComponentPolyfill(str) {
	return str.replace(
		/[^A-Za-z0-9\-_.~]/g,
		'%' + char.charCodeAt(0).toString(16).toUpperCase()
	);
}

if (0) void
function encodeRFC3986URIComponent(str) {
	return encodeURIComponent(str).replace(
		/[!'()*]/g /*fix'*/,
		c => '%' + c.charCodeAt(0).toString(16).toUpperCase()
	);
}
