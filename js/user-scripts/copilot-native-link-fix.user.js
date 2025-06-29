// ==UserScript==
// @name         Copilot to use native <a href>
// @namespace    Violentmonkey Scripts
// @version      1.0
// @author       denisde4ev
// @description  because it messes up middle click to open in new tab, and right click open in new tab/new window (and annoyng 1 additional button to click to confirm opening) -- 2025-06-19T16:40:50+03:00
// @match        https://copilot.microsoft.com/*
// @grant        none
// ==/UserScript==


(function () {
	'use strict';

	{ // sadly if we hover while still generating the response, Copilot messes up = opacity 0 to new button, and removes the display of old one
		const style = document.createElement('style');
		style.textContent = `
			.x_qoo0uk7U-hide { display: none !important; }
			.x_qoo0uk7U-show { opacity: unset !important; }
		`;
		document.head.appendChild(style);
	}

	{ ;
		//test:
		//document.addEventListener('click', (e) => fixBtn(e.target) );
		//document.addEventListener('contextmenu', (e) => fixBtn(e.target), { capture: true });
		//document.addEventListener('mousedown', (e) => fixBtn(e.target), { capture: true }); // sadly didnt work for middle click

		// use mouseover because I want to detect it before middle clicking, later on I myght test if possible to pass the middle click to open in new tab
		// NO!, dont listen on click.. or right click will be missed, we'll miss the open in new window / tab / bg tab, copy link!
		document.addEventListener('mouseover', e => fixBtn(e.target) );
	}



	function fixBtn(btn) {
		if (! (btn.matches('button[data-url]:not([data-converted])')) ) return;
		if (! (btn && !btn.dataset.converted) ) return;

		const link = document.createElement('a');
		const btn2 = document.createElement('button'); // button wrapper, try to keep the styles
		link.href = btn.getAttribute('data-url');
		link.textContent = btn.textContent || 'Link';

		// Copy attributes
		for (const attr of btn.attributes) {
			if (/*attr.name !== 'type' && */ attr.name !== 'data-url') continue;

			btn2.setAttribute(attr.name, attr.value);
		}
		btn2.type = 'button';
		//copySafeStyles(btn, btn2);

		{ // slow sites need this. or clicking back will be slow!
			link.target = '_blank';
			link.rel = 'noopener noreferrer';
		}

		link.classList.add('x_qoo0uk7U-show');
		btn2.classList.add('x_qoo0uk7U-show');
		btn.parentElement.insertBefore(btn2, btn);
		btn2.appendChild(link);

		btn.style.display = 'none';
		btn.classList.add('x_qoo0uk7U-hide');
		btn.dataset.converted = 'true'; // prevent re-adding

	};
})();






/* DOES NOT WORK in 'letter-spacing'
// ai
function copySafeStyles(sourceEl, targetEl) {
	const computed = window.getComputedStyle(sourceEl);

	const preservedStyles = [
		'color',
		'backgroundColor',

		'fontSize',
		'fontWeight',
		'fontFamily',
		'textAlign',

		'borderRadius',
		'lineHeight',
		'display',
		'verticalAlign',

		'text-decoration',
		//'textDecoration',
		'margin', 'border', 'padding',
		'letter-spacing', // AND IT DOES NOT WORK!!!, seems to be 0.1px but this value gets 'normal' and in <a> it shows as 0px
	];

	preservedStyles.forEach((prop) => {
		targetEl.style[prop] = computed[prop] || 'unset';
	});
}
*/
