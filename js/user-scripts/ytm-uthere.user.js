// ==UserScript==
// @name         YTMusic Auto "Still Watching?" Confirm (instant - no delay)
// @namespace    Violentmonkey Scripts
// @version      1.0-1
// @author       denisde4ev
// @description  when pmompt opens "Still watching?" click "ok" prompt on YouTube Music as soon as it appears.
// @description  
// @description  2025-06-25
// @match        https://music.youtube.com/*
// @grant        none
// @run-at       document-idle
// @homepage     https://github.com/denisde4ev/html-css-js/blob/master/js/user-scripts/ytm-uthere.user.js
// ==/UserScript==



// started from AI code, but heavy edit, and debugged almost(99%) every line
// https://copilot.microsoft.com/chats/Bn37aCn3GdiVF5qkRqB33


// debugger
// throw untested line by line

(function() {
	'use strict';

	// Called whenever a prompt might be active
	function checkAndConfirm(container) {
	console.log('YTMusic-uthere: checkAndConfirm, container:', container)
		// look for the renderer
		var youThere = container.querySelector('ytmusic-you-there-renderer');
		if (!youThere) return;

		// find the next-button
		var btn = container.querySelector('button.yt-spec-button-shape-next, button.yt-spec-button-shape-next--text');
		if (!btn) console.error('could not find ok button for youThere');

		btn.click();
		console.log('YTMusic-uthere: clicked "Still watching?"');
		// todo: (not thta important) needs debounce fn wrapper, this runs around 2 or 3 times, tho its not a problem
		document.title = ('YTMusic-uthere: clicked "Still watching?"');
	}

	// Attach an observer to a single <ytmusic-popup-container>
	function observeContainer(container) {
		console.log('YTMusic-uthere, checking, container:', container);
		var mo = new MutationObserver(muts => {

			// for (const m of muts) {
			// 	console.log('YTMusic-uthere: mutation observed', {
			// 		type: m.type,
			// 		target: m.target,
			// 		oldValue: m.oldValue,
			// 		attributeName: m.attributeName,
			// 		newValue: m.target.getAttribute(m.attributeName)
			// 	});
			// }

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
			// TODO: we can skip/optimize this `subtree: true` if we just observe the correct child directly, small todo

			attributes: true,
			//attributeFilter: ['class', 'class'],
			attributeFilter: ['style'],
		});

		// also run once in case prompt is already visible
		checkAndConfirm(container);
	}

	// watch document for when the popup container is added
	function init() {
		// if it’s already there at page-load
		var existing = document.querySelector('ytmusic-popup-container');
		if (existing) observeContainer(existing);
		else console.error('YTMusic-uthere: failed to find el <ytmusic-popup-container>, not expected to need to retry')

		return;
		/* for now assume it will always have it on load

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

	init();
})();
