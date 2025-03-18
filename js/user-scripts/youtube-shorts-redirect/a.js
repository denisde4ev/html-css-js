// ==UserScript==
// @name         YouTube - Shorts Redirect
// @namespace    Violentmonkey Scripts
// @match        *://*.youtube.com/*
// @description  YouTube /shorts redirect to /watch
// @grant        none
// @version      1.0
// @author       denisde4ev
// @run-at       document-start
// ==/UserScript==


//function run(url) {
//	var urlsplit = url.split('/shorts/');
//
//	if (1 < urlsplit.length) {
//		location.replace("https://www.youtube.com/watch?v=" + urlsplit.pop());
//	}
//}

// probably slowest (never benchmarked)
//function run(url) {
//	var newUrl = url.replace(
//		// /^(https:\/\/(www\.)?youtube\.com|)\/shorts\//s,
//		'https://www.youtube.com/shorts/',
//		'https://www.youtube.com/watch?v=',
//	);
//
//	if (url === newUrl) return;
//	location.replace(newUrl);
//}

// should be the fastest (never benchmarked)
function run(url) {
	if (!url.startsWith('https://www.youtube.com/shorts/')) return;

	// note: 'https://www.youtube.com/shorts/'.length = 31

	location.replace(
		'https://www.youtube.com/watch?v=' + url.slice(31)
	);

	return true;
} 

// window.addEventListener("urlchange", e => run(e.detail.url) );
document.addEventListener("yt-navigate-start", e => run(e.detail.url) );
run(location.href);
//run(location.pathname);




// document.addEventListener('yt-navigate-start', run);
