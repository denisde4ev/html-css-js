/*
To implement a custom event with the ability to bubble, have a preventDefault method, and have stopPropagation and stopImmediatePropagation methods, you can use the following approach:
*/

function MyEvent(type, eventInit = {}) {
	if (!(this instanceof MyEvent)) throw new TypeError('calling a MyEvent constructor without new is forbidden');
	//this.timeStamp = Date.now();
	this.type = type;

	//this.eventPhase = MyEvent.NONE ;
	//this.target = void 0;
	//this.currentTarget = void 0;

	this.cancelable = eventInit.cancelable || true; // NOTE/NONSTANDART: should be `false` by default but for MyEvent I prefer it to true most/all of the times
	this.defaultPrevented = false;

	//this.bubbles = eventInit.bubbles || false;
	//this.cancelBubble = false; // alternative name: 'propagationStopped', but 'cancelBubble' is (now deprecated) from browsers
	this.immediatePropagationStopped = false;

	this._cbs = new WeakMap();
}

//MyEvent.NONE = 0;
//MyEvent.CAPTURING_PHASE = 1;
//MyEvent.AT_TARGET = 2;
//MyEvent.BUBBLING_PHASE = 3;

MyEvent.prototype.preventDefault = function() {
	if (this.cancelable) {
		this.defaultPrevented = true;
	}
	return this;
};
MyEvent.prototype.stopPropagation = function() {
	//this.cancelBubble = true;
	return this;
};
MyEvent.prototype.stopImmediatePropagation = function() {
	this.immediatePropagationStopped = true;
	this.stopPropagation();
	return this;
};


MyEvent.prototype.on = MyEvent.prototype.addEventListener = function(el, cb) {
	if (!(( typeof el === 'object' && el !== null )|| typeof el === 'function')) throw new TypeError('element must not be primitive value');
	if (!(typeof cb === 'function')) throw new TypeError('callback must a function');

	if (!this._cbs.has(el)) {
		this._cbs.set(el, [cb]);
	} else {
		this._cbs.get(el).push(cb);
	}
	return this;
};
MyEvent.prototype.off = MyEvent.prototype.removeEventListener = function(el, cb) {
	if (!(( typeof el === 'object' && el !== null )|| typeof el === 'function')) throw new TypeError('element must not be primitive value');
	if (!(typeof cb === 'function')) throw new TypeError('callback must a function');

	//if (!this._cbs) return;
	if (!this._cbs.has(el)) return;
	this._cbs.set(el, this._cbs.get(el).filter(subed => subed !== cb));
	return this;
};


//MyEvent.dispatchEvent = 
MyEvent.emit = function(e, el) {
	if (!(e instanceof MyEvent)) throw new TypeError('event must be instance of MyEvent');
	if (!(( typeof el === 'object' && el !== null )|| typeof el === 'function')) throw new TypeError('element must not be primitive value');
	this.target = el;

	//for (
		var currentTarget = el;
	//	currentTarget/* && !e.cancelBubble*/;
	//	currentTarget = currentTarget.parentNode;
	//) {
	//	//e.eventPhase = MyEvent.CAPTURING_PHASE;
	//	// if (!e._cbs.has(el)) break;
		e.currentTarget = currentTarget;
	//	//currentTarget.dispatchEvent(e);
		e.returnValue = true;
		e._cbs.get(el).forEach(cb => {
			if (e.immediatePropagationStopped) {
	/*			break;*/ return;
			}
			try {
				if ( cb.call(el, e) === false || e.returnValue === false ) {
					// return status from event is not standart and amost no info.
					// ref: https://developer.mozilla.org/en-US/docs/Web/API/Event/returnValue (might be a bit deprecated, but its convinient)
					e.preventDefault();
					// and just leave .returnValue as is when return
				}
			} catch (e) {
				console.error(e);
			}
		});

	//	//if (e.cancelBubble) {
	//		break;
	//	//}
	//	//e.eventPhase = MyEvent.AT_TARGET;
	//}
	//e.eventPhase = MyEvent.BUBBLING_PHASE;
	e.currentTarget = void 0;
};

MyEvent.prototype.trigger = function(el) {
	return MyEvent.emit(this, el);
}


/*
This MyEvent class has a number of properties and methods that mimic the behavior of the native Event object. It has a type property that specifies the type of event, and a bubbles property that specifies whether the event should bubble up through the DOM hierarchy. It also has a cancelable property that specifies whether the event can be canceled, and a target property that specifies the element that dispatched the event.

The MyEvent class has a preventDefault method that can be used to cancel the event if it is cancelable, and a stopPropagation method that can
*/