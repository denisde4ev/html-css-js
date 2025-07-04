// ==UserScript==
// @name        vivaldi mail open all selected mails to new separate tabs
// @namespace   Violentmonkey Scripts
// @match       https://webmail.vivaldi.net/*
// @version     1.0
// @author      denisde4ev
// @description 2025-04-24T16:07:50+03:00
// @grant       GM_registerMenuCommand
// ==/UserScript==


GM_registerMenuCommand("open selected mails to separate tabs", () => {
	document.querySelectorAll('.message.selected a').forEach el=> {
		window.open(el.href, "_blank");
	});
});

