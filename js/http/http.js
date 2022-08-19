
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
	xhr.open(method, url||".", async)

	for (var k in props)
		if (typeof xhr[k] === "function")
			props[k].forEach(xhr[k].apply.bind(xhr[k],xhr));
		else
			xhr[k] = props[k]

	xhr.send(body||{});

	if (async) {
		if (window.D) { // https://github.com/denisde4ev/html-css-js/blob/master/js/defferred/deffered.js
			var d = xhr.d = D({callOnce:true});
			xhr.then = d.then.bind(d);
		}
		if (callback || d) {
			xhr.addEventListener('readystatechange', function (e) {
				if (e.target.readyState !== 4) return;
				var xhr = e.target;
				var status = xhr.status;
				var txt = e.target.responseText;

				if ( status === 0 || ( 200 <= status&&status < 400 ) ) {
					if (callback) callback(null, txt, e, xhr);
					if (d) d.resolve(txt, e, xhr);
				} else {
					if (callback) callback(status, txt, e, xhr);
					if (d) d.reject(txt, e, xhr);
				}
			});
		}
		return xhr;
	}

	var status = xhr.status;
	if (!(  status === 0 || ( 200 <= status&&status < 400 ) )) throw xhr;
	if (a1==null&&!a2) return xhr.responseText;
	return xhr;
}

hGet  = function (url,       a1, a2) { return HTTP('GET',  url, null, a1, a2); };
hPost = function (url, body, a1, a2) { return HTTP('POST', url, body, a1, a2); };

// console.time('hGet')
// and then one liner: hGet('/data1') -> sting from request
// console.timeEnd('hGet')
