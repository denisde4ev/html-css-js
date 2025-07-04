// ==UserScript==
// @name         Block Ctrl+S
// @namespace    Biolentmonkey Scripts
// @version      1.0
// @description  Blocks Ctrl+S shortcut. 2025-04-24T16:27:44+03:00
// @author       denisde4ev
// @match        *://*/*
// @grant        none
// @homepage     https://github.com/denisde4ev/html-css-js/blob/master/js/user-scripts/block-ctrl+s/a.js
// @run-at       document-start
// ==/UserScript==


void function() {
	// Event listener for keydown events
	window.addEventListener("keydown", function(event) {
		// Check if only Ctrl+S is pressed (no other modifier keys)
		if (
			event.ctrlKey &&
			!event.altKey &&
			!event.shiftKey &&
			!event.metaKey &&
			event.key === "s"
		) {
			event.preventDefault(); // Prevent the default save action
		}
	}, false);
}();
