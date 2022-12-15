var listenOnadd;listenOnadd = function() {
// ref: https://github.com/erickmerchant/onappend/blob/d26d80783cf970844ed04891bea49f0be6e3f796/main.mjs#L9
// doc: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe


var call = (el, eventName) => {
	var fn = el.getAttribute('on'+eventName);
	//if (!fn) return; // expected this fn `call` to be called only when there is an event

	////var isProp = false;
	////if (!fn) { // consider using onadd as empty attribute and adding value element.onadd = fn
	////	fn = el['on'+eventName];
	////	isProp = true;
	////};
	// consider: custom event for jQ 'add'

	var event = { target: el, type: eventName };
	var returned;
	try {
		returned =
			Function('event', fn)
			.call(el, event)
		;
	} catch (e) { console.error(e); }

	// use `return true` to continue calling the event when element is added again
	if (returned !== true) {
		el.removeAttribute('on'+eventName);
		////if (isProp) el['on'+eventName] = null;
	}
};

//let traverse = (target, event) => {
//	call(target, event);
//
//	for (let child of target.childNodes) {
//		traverse(child, event);
//	}
//};

//var findToCall = (parrent_el, eventName) => {
//	console.log('parrent_el:',parrent_el)
//
//	if (parrent_el.hasAttribute('on'+eventName)) call(parrent_el, eventName);
//
//	//for (let el of parrent_el.querySelectorAll('[on'+eventName+']')||'') {
//	//	call(el, eventName);
//	//}
//
//};

var config = {
	childList: true,
	//attributes: true, attributeFilter: ['onadd'],
	//characterData: true,

	subtree: true
};

var mo_callback = (mutationList) => {
	//debugger
	for (let mutation of mutationList) {

		//let traget = mutation.target; // idk: target is duplicated each time, too many calls for taget
		//if (target.hasAttribute('onadd')) call(target, 'add');

		for (let el of mutation.addedNodes) {
			if (el.nodeType === Node.ELEMENT_NODE) {
				//findToCall(el, 'add');
				if (el.hasAttribute('onadd') && document.documentElement.contains(el)) call(el, 'add');
			}
		}

		for (let el of mutation.removedNodes) {
			if (el.nodeType === Node.ELEMENT_NODE) {
				//findToCall(el, 'remove');
				if (el.hasAttribute('onremove') && !document.documentElement.contains(el)) call(el, 'remove');
			}
		}

	}
};

return (el) => { //debugger
	var observer = new MutationObserver(mo_callback);

	observer.observe(el, config);
	return observer;
};

}();
