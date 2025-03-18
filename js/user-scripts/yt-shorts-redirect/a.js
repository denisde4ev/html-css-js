// ==UserScript==
// @name        YouTube Shorts Redirect (blazingly fast - no page reload) (still in dev)
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 11/03/2025, 23.34.08
// ==/UserScript==


// log id: 'js_Oozeiv4O'
//console.debug('hi js_Oozeiv4O, log to click and debug me');
// works

// FIXME:
// exepct 1 known corner case:
// when loading page with short and after (4? or is it 3) redirects
// if I press middle click on back button it opens in new page somethnig strange + fake alert ~"we did mess up"
// + also idk what happens on back button with no middle click

// todo: todo, todo... just quit refusing to use (location.replace/setting .href) and just replace ~45 lines with 1 line code!
// `if(url.startsWith('https://www.youtube.com/shorts/') location.replace('https://www.youtube.com/watch?v='+url.slice(31)); `



/// do not edit here,
/// /tmp/tmp.shpid313852.cGjb/22/3










if ( sessionStorage.getItem('Oozeiv4O_homeRedirect') ) {
	//console.error('js_Oozeiv4O: we did mess up, around var Oozeiv4O_homeRedirect');
	alert('js_Oozeiv4O: we did mess up, around var Oozeiv4O_homeRedirect');
	sessionStorage.removeItem('Oozeiv4O_homeRedirect');
	history.go(-1);
	throw 'Oozeiv4O_homeRedirect mess up';
}







document.addEventListener("yt-navigate-start", _main); // not tested

_main({ Oozeiv4O_timeWaiting:0, Oozeiv4O_init: true });
let Oozeiv4O_homeRedirect = false;
function _main(arg1) {

	try{
		if (!history.state) {
			if (!location.pathname.startsWith('/shorts')) return;
			//document.getElementById('logo').click();
			// holy FK YT why is there 2 elements with same ID
			// `document.all.item('logo').length = 3` literally the meme theres 3 actually

			setTimeout(_=>{// wait a bit for YT to load
				sessionStorage.setItem('Oozeiv4O_homeRedirect', 'did we mess up');
				Oozeiv4O_homeRedirect = true;
				document.querySelector('a#logo[href="/"]').click();
				// I hate doing this, global var:
				history.go(-1);
			}, 5e3); // TODO:!!! waiting too long, fix it
			return;


			if(0){ /* turns out this does not work, even after waiting YT wont push state */
				let Oozeiv4O_timeWaiting = arg1?.Oozeiv4O_timeWaiting || 0;
				if ( 30e3 /*30s*/ <= Oozeiv4O_timeWaiting) {
					throw new Error('js_Oozeiv4O: waited too much 30s for first history.state');
				}

				let toWaitThisTime = Oozeiv4O_timeWaiting <= 2e3 ? 100 : 500;
				// NOTE:! for now do not keep { ...arg1, }, not expected to be needed (FOR NOW)
				setTimeout(_ => _main({Oozeiv4O_timeWaiting: Oozeiv4O_timeWaiting + toWaitThisTime }), toWaitThisTime);
				// I know its more then wanted, but if it lags, we probably want to wait more.
			}

			return;
		} else {
			// idk if possible to get history.state but no .endpoint
			if (history.state.endpoint.commandMetadata.webCommandMetadata.webPageType !== "WEB_PAGE_TYPE_SHORTS") return;
		}
	} catch (e) {
		console.error('js_Oozeiv4O:', e);
		return;
	}


	if (arg1.Oozeiv4O_init || history.length === 1) {
		// not expected to be reached/needed?
		// expected to always go to homepage,
		// because YT doesn't set history.state
		// (by `history.replaceState` at least thats what I would do)
		// with no redirecting

		console.warn('js_Oozeiv4O: never tested in this case');
	}

	let isOnlyHistory = Oozeiv4O_homeRedirect || arg1.Oozeiv4O_init || history.length === 1;
	Oozeiv4O_homeRedirect = false;

	history[isOnlyHistory ? 'pushState' : 'replaceState'](
		{
			"endpoint": {
				"clickTrackingParams": history.state.endpoint.clickTrackingParams,
				"commandMetadata": {
					"webCommandMetadata": {
						"url": `/watch?v=${history.state.endpoint.reelWatchEndpoint.videoId}`, // history.state.endpoint.commandMetadata.webCommandMetadata.url
						"webPageType": "WEB_PAGE_TYPE_WATCH",
						"rootVe": history.state.endpoint.commandMetadata.webCommandMetadata.rootVe,
					}
				},
				"watchEndpoint": {
					"videoId": history.state.endpoint.reelWatchEndpoint.videoId,
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
		`https://www.youtube.com/watch?v=${history.state.endpoint.reelWatchEndpoint.videoId}`,
	);

	// if () {
	// 	//document.getElementById('logo').click(); // go homepage
	//
	// 	history.go(1);
	// } else {
		history.go(-1);
		//setTimeout(_=>{history.go(1);}, /*5e3*/ 200); // not needed
		history.go(1);
	//}
};
