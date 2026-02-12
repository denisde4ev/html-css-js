// ==UserScript==
// @name        Copilot fix sometimes refuses to copy
// @match       https://copilot.microsoft.com/chats/*
// @grant       none
// @version     alpha1.0
// @author      denisde4ev
// @description 2025-07-04T06:31:51+03:00
// @namespace   Violentmonkey Scripts
// @run-at      document-start
// ==/UserScript==
'use strict';

//ClipboardEvent.prototype[Symbol.for('original preventDefault')] ||= ClipboardEvent.prototype.preventDefault;
//ClipboardEvent.prototype.preventDefault = ()=>{};


//console.log('dstndstndstndstndrr, debug me');


if (false){

// Global symbol for storing original methods
var ORIGINAL_METHODS2 = Symbol.from('originalMethods');

// Store original preventDefault and replace with wrapper
function patchEventInterface(EventConstructor) {
	if (!EventConstructor.prototype.preventDefault) {
		console.log('note: event costructor does not have preventDefault', EventConstructor);
		return;
	}

	// Store original in prototype under our symbol
	if (!EventConstructor.prototype[ORIGINAL_METHODS2]) {
		EventConstructor.prototype[ORIGINAL_METHODS2] = {};
	} else if (EventConstructor.prototype[ORIGINAL_METHODS2].preventDefault) {
		console.error('not expected to get original method in:', EventConstructor.prototype[ORIGINAL_METHODS2]);
	}

	// Save original method
	EventConstructor.prototype[ORIGINAL_METHODS2].preventDefault = EventConstructor.prototype.preventDefault;

	// Replace with wrapper
	EventConstructor.prototype.preventDefault = function(...args) {
		var error = new Error('preventDefault called');

		console.log({
			timestamp: new Date().toISOString(),
			eventType: this.type,
			target: this.target?.tagName || this.target?.varructor.name,
			stackTrace: error.stack.split('\n').slice(2).join('\n'),
		});

		return this[ORIGINAL_METHODS2].preventDefault.apply(this, args);
	};
}

// Patch all event interfaces
var eventInterfaces2 = [
	Event,
	UIEvent,
	MouseEvent,
	KeyboardEvent,
	WheelEvent,
	TouchEvent,
	PointerEvent,
	InputEvent,
	FocusEvent,
	ClipboardEvent,
	DragEvent,
];

eventInterfaces2.forEach(patchEventInterface);

}







//(as far as I remember this does not work because it needs to subscribe on sub constructor.prototypes,   the code above worked)
// // Create a proxy handler for EventTarget.prototype.preventDefault
// var originalPreventDefault = EventTarget.prototype.preventDefault;
// EventTarget.prototype.preventDefault = new Proxy(originalPreventDefault, {
// 	apply(target, thisArg, args) {
// 		// Print stack trace using Error object
// 		var error = new Error('preventDefault called');
// 		console.log('preventDefault called at:', error.stack);

// 		// Call the original preventDefault
// 		return Reflect.apply(target, thisArg, args);
// 	}
// });

var blacklistedEvents = [
	// Event,
	// UIEvent,
	// MouseEvent,
	// KeyboardEvent,
	// WheelEvent,
	// TouchEvent,
	// PointerEvent,
	// InputEvent,
	// FocusEvent,
	ClipboardEvent,
	// DragEvent,
];


console.warn(`
// NEVER TESTED 2025-07-04T11:22:11+03:00
// tell me what happened
`); debugger;

// Also handle addEventListener to catch newly added listeners

// Map to track original ⇒ wrapped listeners
var listenerMap = new WeakMap();

var originalAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(type, listener, options) {
	// Wrap the listener to detect preventDefault calls within it
	var wrappedListener = function(...args) {
		var event = args[0];

		if (blacklistedEvents.some(constructor => event instanceof constructor)) {
			console.log(
				'wrappedListener stopped event',
				new Error('not error. just stack trace'),
				{ event, this: this, listener, args }
			);
			return;
		}

		// Temporarily replace event.preventDefault during listener execution
		var originalEventPreventDefault = event.preventDefault;
		event.preventDefault = () => {
			console.log('preventDefault called', new Error('not error. just stack trace'));
			originalEventPreventDefault.call(event);
		};

		// Call the original listener
		listener.apply(this, args);

		// Restore the original preventDefault
		event.preventDefault = originalEventPreventDefault;
	};

	// Track mapping for removal
	listenerMap.set(listener, wrappedListener);

	return originalAddEventListener.call(this, type, wrappedListener, options);
};

// Override removeEventListener to look up the wrapped function
var originalRemoveEventListener = EventTarget.prototype.removeEventListener;
EventTarget.prototype.removeEventListener = function(type, listener, options) {
	var wrapped = listenerMap.get(listener);
	console.log('rm event called', {this:this,listener} ,new Error('not error. just stack trace'));
	return originalRemoveEventListener.call(this, type, wrapped || listener, options);
};
