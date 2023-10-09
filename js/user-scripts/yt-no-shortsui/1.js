// ==UserScript==
// @name         YT shorts UI to video UI (url redirect)
// @match        https://www.youtube.com/*
// @version      1.0
// @description  2023-09-22
// @author       denisde4ev
// @run-at       document-start
// ==/UserScript==

//function D() { var d = []; d.then = d.push; return d; }
function Promise_Deferred() {
	var o, x;
	var p = new Promise((O, X) => (o = O, X = X));
	p.resolve = o;
	p.reject = x;
	return p;
}


function setTimeout_awaitable(cb, ms) {
	var d = Promise_Deferred(); 

	setTimeout(_ => {
		try {
			var cb_returnedValue = cb();
		} catch (e) {
			d.reject(e);
		}
		d.resolve(cb_returnedValue);
	}, ms);

	return p;
};

function Object_defineProxyApply(target, key, fn) {
	var oldfn = target[key];
	target[key] = function() {
		return fn.call(null, target, this, arguments, oldfn);
	};
}



function YT_redirect(url) {
	// spa redirect, no page reload
	// '<a class="yt-simple-endpoint" href="/watch?v=..."></a>'

	// var d = Promise_Deferred();
	var d;

	try {
		var a = document.createElement('a');
		a.className = 'yt-simple-endpoint';
		a.href = url;
		a.style.display = 'none';
		document.querySelector('ytd-app').insertAdjacentElement('beforeEnd', a);
		d = setTimeout_awaitable(_=> a.remove(), 100); // note: just in case keep it, it (might) work even on instant remove after click
	} catch (e) {
		location.href = url;
		return Promise.reject(e);
	}
}

var YT_util = {
	isShorts() { return location.pathname.startsWith('/shorts/'); },
	getNonShortsUrl() { return location.href.replace('?','&').replace('/shorts/', '/watch?v='); },
	ifShortRedirect() { if (!this.isShorts()) return; YT_redirect(YT_util.getNonShortsUrl()); },
};


////


YT_util.ifShortRedirect();


Object_defineProxyApply(history, 'pushState', (target, that, arguments, oldfn) => {
	debugger
});
