// ==UserScript==
// @name        azlirics - CSS+JS - HIDE the text - when double click on body/empty space
// @namespace   Violentmonkey Scripts
// @match       https://www.azlyrics.com/lyrics/*
// @grant       none
// @version     1.0
// @author      @denisde4ev
// @description 2025-01-11
// ==/UserScript==




var styleElement; // todo/consider: add random id

{ // Inject CSS into the page when it loads

	var cssStyles = `
		* { font-size: 0 !important; }
		body{height: 100vh}
	`;

	// Function to inject CSS into the page
	void function injectCSS() {
		styleElement = document.createElement('style');
		styleElement.media = 'never'; // Disable CSS initially
		styleElement.textContent = cssStyles;
		document.head.appendChild(styleElement);
	}();

}

// Function to toggle the CSS styles
function toggleCSS() {
	if (styleElement) {
		// Enable or disable the CSS by changing the media property
		styleElement.media = styleElement.media === 'all' ? 'never' : 'all';
	}
}


// Listen for double-click events on the body element
document.body.addEventListener('dblclick', function(event) {
	// Check if the target element is the body or contains the specified class
	//
	// NOTE!/todo: not perfect, but if cursor is a further from the text, it'll work
	// well, a more problematic is bug: when text hidden,
	// again cant d-click on the center to show again,
	// it should be clicked colose to corners
	if (event.target === document.body || event.target.classList.contains('main-page')) {

		// Toggle the CSS styles
		toggleCSS();
	}
});

