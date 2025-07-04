// ==UserScript==
// @name         Copilot to use native <a href> + userselect fix
// @version      1.2
// @match        https://copilot.microsoft.com/*
// @description  because it messes up middle click to open in new tab.
// @description  and right click open in new tab/new window.
// @description  (and annoying 1 additional button to click to confirm opening)
// @description
// @description  2025-06-19
// @author       denisde4ev
// @homepage     https://github.com/denisde4ev/html-css-js/blob/master/js/user-scripts/copilot/fix-a.user.js
// @license      GPTv3
// @namespace    Violentmonkey Scripts
// @grant        none
// ==/UserScript==
void function() {
'use strict';


// log id: js_qoo0uk7U
//console.log('debug me: js_qoo0uk7U');
//debugger

document.head.insertAdjacentHTML('beforeend', `<style>


	.x_qoo0uk7U-show,button[data-url],
	/* .x_qoo0uk7U-show > a, */
	_{ user-select: auto; }



	/*
	// sadly if we hover while still generating the response, Copilot messes up = opacity 0 to new button, and removes the display of old one
	// 'x_qoo0uk7U-hidde-next' coz when clicked while generating response it recreates the button --> removes class I'v added .x_qoo0uk7U-hidden
	*/
	.x_qoo0uk7U-hidden, .x_qoo0uk7U-hidde-next + button[data-url] { display: none !important; }
	.x_qoo0uk7U-show { opacity: unset !important; }

<style>`);



{
	// test:
	//document.addEventListener('click', (e) => fixBtn(e.target) );
	//document.addEventListener('contextmenu', (e) => fixBtn(e.target), { capture: true });
	//document.addEventListener('mousedown', (e) => fixBtn(e.target), { capture: true }); // sadly didnt work for middle click

	// use mouseover because I want to detect it before middle clicking
	// NO!, dont listen on click.. or right click will be missed, we'll miss the open in new window / tab / bg tab, copy link!
	document.addEventListener('mouseover', e => fixBtn(e.target) );
};



function fixBtn(btn) {
	if (! (btn.matches('button[data-url]:not(.x_qoo0uk7U-hidden)')) ) return;
	if (btn.matches('button.x_qoo0uk7U-show + *')) {
		throw new Error('js_qoo0uk7U: duplicated button?');
	};
	// debug: console.log('js_qoo0uk7U', btn, new Error());

	const link = document.createElement('a');
	const btn2 = document.createElement('button'); // button wrapper, try to keep the styles
	link.href = btn.getAttribute('data-url');
	link.textContent = btn.textContent || 'Link';

	// Copy all attributes
	for (const attr of btn.attributes) {
		if (!( /*attr.name !== 'type' && */ attr.name !== 'data-url' )) continue;

		btn2.setAttribute(attr.name, attr.value);
	};
	btn2.type = 'button'; // already set, just in case
	//copySafeStyles(btn, btn2);

	{ // slow sites need this. or clicking back will be slow!
		link.target = '_blank';
		link.rel = 'noopener noreferrer';
	};

	link.classList.add('x_qoo0uk7U-show');
	btn2.classList.add('x_qoo0uk7U-show');
	btn2.classList.add('x_qoo0uk7U-hidde-next');
	btn.before(btn2); //btn.parentElement.insertBefore(btn2, btn);
	btn2.appendChild(link);

	btn.style.display = 'none';
	btn.classList.add('x_qoo0uk7U-hidden');

};


// for now won't auto open links like `[3]`  selector:`button[aria-expanded][aria-label^="Citation "][type="button"]`  and cannot easily / (or at all) get the url value, just to be shown as hint in the corner


}();
