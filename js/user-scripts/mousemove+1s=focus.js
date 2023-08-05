// ==UserScript==
// @name        mousemove + inteval = focus
// @namespace   Violentmonkey Scripts
// @match       https://*/*
// @match       http://*/*
// @grant       none
// @version     1.0
// @author      denisde4ev
// @description 2023-04-22T11:07:01+03:00
// ==/UserScript==

var INTERVAL = 1e3; // in ms

// Q: But why.
// A: touchpad its hard to leftclick (you have to stop thumb up, thump down (when press does not work)).
// also a bit anoying even for regular mouse (clicking down when not holding mouse properly could move the mouse)

// TODO: add siteblacklist with keyboard shortcut

// todo: move in textarea should move the cursor

var focus = document.hasFocus();
addEventListener('focus', e => focus = 1 );
addEventListener('blur', e => focus = 0 );



function focusSomething(el) {
	if (!el) return null;

	var focusable = findFocusableElement(el);
	if (focusable) {
		focusable.focus()
		return focusable;
	}

	var hadTiAttr = el.hasAttribute('tabindex');
	el.setAttribute('tabindex', -1);

	console.assert( el.tabIndex === -1 );
	console.assert( el.getAttribute('tabindex') === '-1' );
	el.focus();

	if (!hadTiAttr) el.removeAttribute('tabindex');
	// todo: this is called in same event loop as `.focus()`,
	// check if this will prevent the focus

	return el;
};

function findFocusableElement(el) {
	for (
		;
		el;
		el = el.parentElement
	) {
		if (isFocusable(el)) return el;
	}
};

/*
// NOTE: since we check both
// `el.tabIndex ===-1` and `!==-1`
// that means that this is the only thing that matters...
function isFocusable(el) {
	// Check if the el is focusable
	if (el.tabIndex === -1) return false;

	if (el.tagName.match(/^(INPUT|SELECT|TEXTAREA|BUTTON|OBJECT)$/i) && !el.disabled) {
		return true;
	}
	if (el.hasAttribute('contenteditable')) return true

	if (el.tabIndex !== -1) return true;

	return false;
}
*/
var isFocusable = el => Number.isFinite(el.tabIndex) && 0 <= el.tabIndex;


var log=(...d)=>console.log(...d)||d[0];


var lastMousemoveEvent;
var lastMousemoveEvent_focus = _ => {
	focusSomething(
	document.elementFromPoint(
		lastMousemoveEvent.clientX,
		lastMousemoveEvent.clientY
	));
	lastMousemoveEvent = null;
};

var t;
var T = _ => {
	return setTimeout(lastMousemoveEvent_focus, INTERVAL);
};

var lastMousemoveEvent_toFocus_start = e => {
	if (t) clearTimeout(t);
	// if (e.type === 'mousemove') { // no need to check for now
		lastMousemoveEvent = e; // note: save last ever if `blur`ed
	//}
	if (focus) t = T();
};

var lastMousemoveEvent_toFocus_pause = e => {
	if (t) clearTimeout(t);
	t = null;
};

var lastMousemoveEvent_toFocus_stop = e => {
	if (t) clearTimeout(t);
	lastMousemoveEvent = null;
	t = null;
};

var lastMousemoveEvent_toFocus_resume = e => {
	console.assert(!t, 'lastMousemoveEvent_toFocus_resume: not paused');
	if (!t) if (lastMousemoveEvent) t = T();
};


addEventListener('mousemove', lastMousemoveEvent_toFocus_start);
addEventListener('blur', lastMousemoveEvent_toFocus_pause);
addEventListener('focus', lastMousemoveEvent_toFocus_resume);

// prefer any input to stop the focus
addEventListener('keydown', lastMousemoveEvent_toFocus_stop);
addEventListener('mousedown', lastMousemoveEvent_toFocus_stop);
