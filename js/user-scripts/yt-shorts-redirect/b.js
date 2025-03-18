// ==UserScript==
// @name        YouTube Shorts Redirect (blazingly fast - no page reload)
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/*
// @grant       none
// @version     1.0
// @author      @denisde4ev
// @description started on 2025-11-03T23:34:08+02:00
// @run-at      document-start
// ==/UserScript==




//

// log id: 'js_Oozeiv4O'
//console.debug('hi js_Oozeiv4O, log to click and debug me');

{ // if already loading shorts, reload will be just as fast as continueing to load. (and history.current state is not available while loading ... so better reload)
	let url = document.location.href;
	if (url.startsWith('https://www.youtube.com/shorts/')) {
		// 'https://www.youtube.com/shorts/'.length
		// location.replace('https://www.youtube.com/watch?v='+url.slice(31));
		location.replace('https://youtube.com/v/'+url.slice(31)); // `/v` I'm leaving it like this to indicate page loading
		return; // return as page will be reloaded, and script run again without going to this `if` case
	}
}

// for testing
if (0)
window.onbeforeunload = e => {
e.preventDefault();
return 'stop'
}



document.addEventListener("yt-navigate-start", _ => {

	try {
		// idk if possible to get history.state but no .endpoint
		if (history.state.endpoint.commandMetadata.webCommandMetadata.webPageType !== "WEB_PAGE_TYPE_SHORTS") return;
	} catch (e) {
		console.error('js_Oozeiv4O:', e);
		return;
	}

	let endpoint = history.state.endpoint;
	let videoId = endpoint.reelWatchEndpoint.videoId;
	history.replaceState(
		{
			"endpoint": {
				"clickTrackingParams": endpoint.clickTrackingParams,
				"commandMetadata": {
					"webCommandMetadata": {
						"url": `/watch?v=${videoId}`, // history.state.endpoint.commandMetadata.webCommandMetadata.url
						"webPageType": "WEB_PAGE_TYPE_WATCH",
						"rootVe": endpoint.commandMetadata.webCommandMetadata.rootVe,
					}
				},
				"watchEndpoint": {
					"videoId": videoId,
					//"playerParams": "?????????????????",
					//"watchEndpointSupportedOnesieConfig": {
					//  "html5PlaybackOnesieConfig": {
					//    "commonConfig": {
					//      "url": "https://rr5---?????.googlevideo.com/initplayback?source=youtube&?????",
					//    }
					//  }
					//}
				}
			},
			//"JSC$25806_savedComponentState": {},
			"entryTime": history.state.entryTime,
		},
		document.title,
		`https://www.youtube.com/v/${videoId}`, // `/v` I'm leaving it like this to indicate page loading
	);

	history.go(-1);
	history.go(1);

});
