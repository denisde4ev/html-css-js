// ==UserScript==
// @name         Shift F11 fullscreen
// @namespace    Violentmonkey Scripts
// @version      0.1
// @description  Shift+F11 = "real fullscreen";
// @description  Shift + click on page fullscreen = no fullscreen
// @description  (
// @description   feature not a bug: depending on the page js/css
// @description   it may result in fullscreen page
// @description   without browser being in fulscreen
// @description  )
// @author       denisde4ev
// @match        *://*/*
// @grant        none
// ==/UserScript==

var originalRequestFullscreen = Element.prototype.requestFullscreen;

var shiftPressed = false;
document.addEventListener('keydown', e => { if (e.key === 'Shift') shiftPressed = true;  });
document.addEventListener('keyup',   e => { if (e.key === 'Shift') shiftPressed = false; });

Element.prototype.requestFullscreen = function(opt) {
	if (!shiftPressed) {
		return originalRequestFullscreen.apply(this, arguments);
	}
};



// SRC: https://update.greasyfork.org/scripts/495945/No%20Fullscreen%20Dropdown.user.js
// SRC: https://github.com/tientq64/userscripts/tree/main/scripts/No-Fullscreen-Dropdown
window.addEventListener('keydown', (event) => {
	if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;
	if (event.code !== 'F11') return;

	if (event.shiftKey) {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			//document.documentElement.requestFullscreen();
			/*+*/ originalRequestFullscreen.call(document.documentElement);
		}

		event.preventDefault();
	}
});
