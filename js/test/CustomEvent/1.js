
//Q: implement CustomEvent polyfill
//AI:
// never tested 

// Create a CustomEvent function if the browser doesn't support it
if (typeof window.CustomEvent === 'function') return false;

function CustomEvent(event, params) {
  params = params || { bubbles: false, cancelable: false, detail: undefined };
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
}

CustomEvent.prototype = window.Event.prototype;

CustomEvent;
