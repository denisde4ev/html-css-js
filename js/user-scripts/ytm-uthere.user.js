// ==UserScript==
// @name         YTMusic Auto "Still Watching?" Confirm (instant - no delay)
// @namespace    Violentmonkey Scripts
// @version      1.1
// @author       denisde4ev
// @description  when pmompt opens "Still watching?" click "OK" prompt on YouTube Music as soon as it appears.
// @description  
// @description  started 2025-06-25; last working: days before 2025-06-30 (idk never saw it agin)
// @match        https://music.youtube.com/*
// @grant        none
// @run-at       document-idle
// @homepage     https://github.com/denisde4ev/html-css-js/blob/master/js/user-scripts/ytm-uthere.user.js
// ==/UserScript==
void function() {
'use strict';

// log id: YTMusic-uthere

function checkAndConfirm(container) {
	// console.log('YTMusic-uthere: checkAndConfirm, container:', container)
	var youThere = container.querySelector('ytmusic-you-there-renderer');
	if (!( youThere && youThere.checkVisibility() )) return;

	var btn = container.querySelector('button.yt-spec-button-shape-next, button.yt-spec-button-shape-next--text');
	if (!btn) {
		console.error('could not find OK button for youThere');
		return;
	}

	btn.click();

	console.log('YTMusic-uthere: clicked "Still watching?"');
	// todo: (not thta important) needs debounce fn wrapper, this runs around 2 or 3 times. tho it's not a problem
}


function observeContainer(container) {
	//console.log('YTMusic-uthere: attach observe container:', container);
	var mo = new MutationObserver(muts => {

		// debug log:
		//for (const m of muts) {
		//	console.log('YTMusic-uthere: mutation observed', {
		//		type: m.type,
		//		target: m.target,
		//		oldValue: m.oldValue,
		//		attributeName: m.attributeName,
		//		newValue: m.target.getAttribute(m.attributeName)
		//	});
		//}

		for (const m of muts) {
			// only care about direct‐child attribute changes
			if (
				m.type === 'attributes' &&
				m.target.parentNode === container &&
			true) {
				// console.log('YTMusic-uthere: mutation observed(&checked)', {
				// 	type: m.type,
				// 	target: m.target,
				// 	oldValue: m.oldValue,
				// 	attributeName: m.attributeName,
				// 	newValue: m.target.getAttribute(m.attributeName)
				// });
				checkAndConfirm(container);
				break;
			}
		}
	});

	mo.observe(container, {
		subtree: true,       // catch style/class changes in descendants
		// TODO/check: we can skip/optimize this `subtree: true` if we just observe the correct child directly, small todo

		attributes: true,
		//attributeFilter: ['class', 'class'],
		attributeFilter: ['style'],
	});

	// also run once in case prompt is already visible
	checkAndConfirm(container);
}


{ // init
	// if it’s already there at page-load
	var existing = document.querySelector('ytmusic-popup-container');
	if (existing) {
		observeContainer(existing);
	} else {
		console.error('YTMusic-uthere: failed to find el <ytmusic-popup-container>, not expected to need to retry');
	}

	return;
	/* for now assume it will always have it on `@run-at document-idle`

	// global observer to catch future containers
	var docMo = new MutationObserver(muts => {
		for (const m of muts) {
			for (const n of m.addedNodes) {
				if (
					n.nodeType === 1 &&
					n.tagName.toUpperCase() === 'YTMUSIC-POPUP-CONTAINER'
				) {
					observeContainer(n);
				}
			}
		}
	});

	docMo.observe(document.body, {
		childList: true,
		subtree: true
	});
	*/
}

}();
