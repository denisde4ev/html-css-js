// ==UserScript==
// @name        Shift+F2 = rename tab
// @namespace   Violentmonkey Scripts
// @match       https://duckduckgo.com/
// @grant       none
// @version     1.0
// @author      -
// @description 31/03/2023, 00.12.50
// todo: update url from gh
// ==/UserScript==


document.addEventListener('keydown', e=>{
if (e.key==='F2') debugger;
if (!(e.key==='F2'&&e.shiftKey &&!e.ctrlKey&&!e.metaKey&&!e.altKey)) return;

var r = prompt(document.title);
debugger
if (!r) return;
document.title

});
