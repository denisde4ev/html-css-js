// ==UserScript==
// @name         DDG bangs for Bing/Google
// @version      1.0
// @description  2023-08-02
// @author       denisde4ev
// @run-at       document-start

// @icon         https://duckduckgo.com/favicon.ico
// @include      https://*.google*/search*

// @match        https://www.bing.com/search*?*q=*!*
// @match        https://www.bing.com/search*?*q=*%21*
// @match        https://*google.*/search*?*q=*!*
// @match        https://*google.*/search*?*q=*%21*
// @icon         https://icons.duckduckgo.com/ip2/duckduckgo.com.ico

// @grant        none
// ==/UserScript==

// original src: https://greasyfork.org/en/scripts/424160-google-bangs/code


void async function() {

	var q = new URLSearchParams(location.search).get('q');

	var data = await (await fetch(
		'https://api.duckduckgo.com/'
		+'?q='+q
		+'&format=json&no_redirect=1'
	).json());

	var newurl = data.Redirect;

	if (!newurl) return;

	location.href = newurl;

}();
