// ==UserScript==
// @name         !bangs for Google & Bing
// @description  DuckDuckGo's !bangs for Google and Bing
// @version      (pre)1.0.1

// @homepageURL  https://github.com/denisde4ev/html-css-js/blob/master/js/user-scripts/ddgBangs_3thPartySearch.js
// @updateURL    https://github.com/denisde4ev/html-css-js/raw/master/js/user-scripts/ddgBangs_3thPartySearch.js
// @author       denisde4ev
// @license      GPL3

// @match        https://www.bing.com/search*?*q=*!*
// @match        https://www.bing.com/search*?*q=*%21*
// @match        https://*google.*/search*?*q=*!*
// @match        https://*google.*/search*?*q=*%21*
// @icon         https://icons.duckduckgo.com/ip2/duckduckgo.com.ico

// @grant        none
// @run-at       document-start
// ==/UserScript==
// no..: // @include      /^https?:\/\/(?<domain>bing\.com|[^?@#\/]*google\.[a-z]{2,3})\/(?<path>search\b.*)\?(?<search_params>([^#]*&)?q=([^&#]*)(\!|\%21).*)$/
void function() {



// TODO: use GM_xmlhttpRequest to avoid random XSS
// TODO: done, but NEVER TESTED

var q = new URLSearchParams(location.search).get('q');
if (!/^\!|\s\!/.test(q)) return; // expected bang to be at the begining or have space before it
//var ddgApiUrl = new URL('https://api.duckduckgo.com/?format=json&no_redirect=1');
//ddgApiUrl.searchParams.set('q', q);

GM_xmlhttpRequest({
	method: 'GET',
	url:
		//ddgApiUrl
		'https://api.duckduckgo.com/?format=json&no_redirect=1&'+encodeURIComporent(q)
	,
	headers: { 'Accept': 'application/json' },
	onload: function(response) {
		var contentType = response.responseHeaders.match(/content-type:\s*(.*?)(;|$)/i)[1];
		if (contentType === "application/json") {
			var err = new Error("Response is not JSON");
			err._data = {response: response};
		}
		var data = JSON.parse(response.responseText);

		if (!data.Redirect) return;
		location.replace(data.Redirect);
	}
});



}();
