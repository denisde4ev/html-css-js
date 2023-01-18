
// var `props` is simular to https://github.com/anonyco/SuperSimpleExtensibleSmallXMLHttpRequestWrapper#documentation

function HTTP(method, url, body, a1, a2) {
	var async = a1;
	var props = a2;
	var callback;

	if (typeof a1 === 'function') {
		async = true;
		callback = a1;
	} else if (typeof a1 === 'object') {
		props = a1;
		async = false;
	}

	var xhr = new XMLHttpRequest;
	xhr.open(method, url||".", async);

	for (var k in props)
		if (typeof xhr[k] === "function")
			props[k].forEach(xhr[k].apply.bind(xhr[k],xhr));
		else
			xhr[k] = props[k]

	//try {
		xhr.send(body||{});
	//}

	if (async) {
		if (window.D) {
		// /^/\ https://github.com/denisde4ev/html-css-js/blob/master/js/lib/deferred/defered.js
			var d = xhr.d = D({callOnce:true});
			xhr.then = d.then.bind(d);
		}
		if (callback || d) {
			xhr.addEventListener('loadend', function (e) {
				let status = e.target.status;
				let txt = e.target.responseText;

				if ( (200 <= status&&status < 400) || (status === 0 && xhr.responseText) ) {
					if (callback) {
						// if callback supports only 1 argument, then call it using text as first arg (and when no http error)
						if (callback.length === 1) {
							callback.call(this, txt, e, xhr);
						} else {
							callback.call(this, null, txt, e, xhr);
						}
					}
					if (d) d.resolve(txt, e, xhr);
				} else {
					if (callback) {
						if (callback.length === 1) {
							if (d) d.reject(txt, e, xhr);
							// console.error({callback, xhr});
							throw new Error('callback does no handle error');
						} else {
							callback.call(this, status, txt, e, xhr);
						}
					}
					if (d) d.reject(txt, e, xhr);
				}
			});
		}
		return xhr;
	}

	var status = xhr.status;
	if (!( ( 200 <= status&&status < 400 ) || (status === 0 && xhr.responseText) )) throw new Error('HTTP status: '+status);
	if (a1==null&&!a2) return xhr.responseText;
	return xhr;
}

var hGet  = function (url,       a1, a2) { return HTTP('GET',  url, null, a1, a2); };
var hPost = function (url, body, a1, a2) { return HTTP('POST', url, body, a1, a2); };

// console.time('hGet')
// and then one liner: hGet('/data1') -> sting from request
// console.timeEnd('hGet')
