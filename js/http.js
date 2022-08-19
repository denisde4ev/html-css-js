function HTTP(method, url, data, a1, a2) { 'use strict';
	// usage: HTTP(method, url, data, async, props)    // where async = boolean
	// usage: HTTP(method, url, data, callback, props) // where callback = function
	// usage: HTTP(method, url, data, props)           // where props = object // async is false -> sync

	var async, callback, props;
	if (typeof a1 === 'object') {
		async = false;
		props = a1;
		// a2 is ignored
	} else if (typeof a1 === 'function') {
		async = true; callback = a1;
		props = a2;
	} else {
		async = a1;
		props = a2;
	}


	var request = new XMLHttpRequest();
	request.open( method||"GET", url||".", async );

	for (var k in props) {
		if (typeof request[k] === "function") {
			props[k].forEach(request[k].apply.bind(request[k],request));
		} else {
			request[k] = props[k];
		}
	}


	var d;
	if (async && window.D) {
		d = request.d = D({callOnce:true});
	};

	if (callback || d) {
		request.onreadystatechange = function (evt) {
			// (never used) // if (props.onreadystatechange) props.onreadystatechange.call(this,evt); // since was overwritten by this fn, call it here
			if (evt.target.readyState !== 4) return;

			var args = [evt.target.responseText, evt.target.status, evt, this];
			if (callback) {
				callback.apply(this, args);
			}
			if (d) {
				if (evt.target.status === 200) {
					d.resolve.apply(d, args);
				} else {
					d.reject. apply(d, args);
				}
			}
		}
	}


	request.send(data);

	return async ? request : request.responseText;
	//if (!async) return request.responseText;
	//return request;
}

hpost = function (url, data, a1, a2) { return HTTP('POST', url, data, a1, a2); };
hget  = function (url,       a1, a2) { return HTTP('GET',  url, null, a1, a2); };



// import D from /assets/js/defferred.js;
HTTP.get('/assets/js/defferred.js', true).d.then(function (t) {
	console.info(t)
})
