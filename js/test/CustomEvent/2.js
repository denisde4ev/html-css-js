/*
To implement a custom event with the ability to bubble, have a preventDefault method, and have stopPropagation and stopImmediatePropagation methods, you can use the following approach:
*/

function MyEvent(type, eventInit = {}) {
	//this.timeStamp = Date.now();
	this.type = type;

	//this.eventPhase = MyEvent.NONE ;
	//this.target = void 0;
	//this.currentTarget = void 0;

	this.cancelable = eventInit.cancelable || false;
	this.defaultPrevented = false;

	//this.bubbles = eventInit.bubbles || false;
	//this.propagationStopped = false;
	//this.immediatePropagationStopped = false;

	this._listeners = new WeakMap();
}

MyEvent.NONE = 0;
MyEvent.CAPTURING_PHASE = 1;
MyEvent.AT_TARGET = 2;
MyEvent.BUBBLING_PHASE = 3;

MyEvent.prototype.preventDefault = function() {
	if (this.cancelable) {
		this.defaultPrevented = true;
	}
};
MyEvent.prototype.stopPropagation = function() {
	this.propagationStopped = true;
};
MyEvent.prototype.stopImmediatePropagation = function() {
	this.immediatePropagationStopped = true;
	this.stopPropagation();
};

MyEvent.emit = function(event, target) {
	this.target = target;

	let currentTarget = target;
	while (currentTarget && !event.propagationStopped) {
		event.eventPhase = MyEvent.CAPTURING_PHASE;
		event.currentTarget = currentTarget;
		//currentTarget.dispatchEvent(event);
		event.dispatchEvent(currentTarget);
		if (event.immediatePropagationStopped) {
			break;
		}
		event.eventPhase = MyEvent.AT_TARGET;
		currentTarget = currentTarget.parentNode;
	}
	event.eventPhase = MyEvent.BUBBLING_PHASE;
	event.currentTarget = void 0;
};
MyEvent.dispatchEvent = function(target) {
	// if (!this._listeners) return;
	this.returnValue = true;
	this._listeners.forEach((listener) => {
		if (event.immediatePropagationStopped) {
			return false;
		}
		try {
			if ( listener.call(this, event) === false || this.returnValue ) { // ref: https://developer.mozilla.org/en-US/docs/Web/API/Event/returnValue
				this.preventDefault();
			}
		} catch (e) {
			console.error(e);
		}
	});
};

MyEvent.prototype.add = function(el, cb) {
	if (this._listeners.has(el)) {
		this._listeners.set(el, [cb]);
	} else {
		this._listeners.get(el).push(cb);
	}
};
MyEvent.prototype.del = function(el, cb) {
	//if (!this._listeners) return;
	if (!this._listeners.has(el)) return;
	this._listeners.set(el, this._listeners.get(el).filter(subed => subed !== cb));
};


/*
This MyEvent class has a number of properties and methods that mimic the behavior of the native Event object. It has a type property that specifies the type of event, and a bubbles property that specifies whether the event should bubble up through the DOM hierarchy. It also has a cancelable property that specifies whether the event can be canceled, and a target property that specifies the element that dispatched the event.

The MyEvent class has a preventDefault method that can be used to cancel the event if it is cancelable, and a stopPropagation method that can
*/