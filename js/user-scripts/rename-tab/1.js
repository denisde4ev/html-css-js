// ==UserScript==
// @name        Shift + F2 = rename tab
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     0.1
// @author      denisde4ev
// @description (title says it all)
// ==/UserScript==


document.addEventListener('keydown', e => {
	if (!(
		e.key === 'F2' && e.shiftKey
		&&
		!e.ctrlKey && !e.metaKey && !e.altKey
	)) return;

	var r = prompt(document.title);
	if (!r) return; // if clicked cacel or empty. if you want to remove the title, just pat space ' '

	document.title = r;
});
