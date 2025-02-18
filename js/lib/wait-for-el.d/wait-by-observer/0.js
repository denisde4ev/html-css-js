
// fork from: https://github.com/azu/wait-for-element.js/blob/1365ec3954f49e53d36efa4f99237019565b3372/lib/wait-by-observer.js
// LICENSE : MIT


throw 'todo'


"use strict";
/**
 * @param {string} selector the css selector
 * @param {number} timeout the timeout is millisecond
 * @returns {Promise}
 */
function waitForElement(selector, timeout = null) {

	var _resolve, _reject;
	var promise = new Promise(function (resolve, reject) {
		_resolve = resolve;
		_reject = reject;
	});


	var observer = new MutationObserver(function (mutations) {

		for (let mutation of mutations) {
			for (let addedNode of mutation.addedNodes) {
				//var addedNode = mutation.addedNodes[i];
				if (typeof addedNode.matches === "function" && addedNode.matches(selector)) {
					_resolve(addedNode);
					observer.disconnect();
					if (timerId != null) clearTimeout(timerId);
				}
			}
		}

	});
	// first time check
	var element = document.querySelector(selector);
	if (element != null) {
		_resolve(element);
		return promise;
	}
	var timeoutOption = timeout ?? 2e3;
	//var timeoutOption = timeout != null ? timeout : 2e3;
	// start
	observer.observe(document.body, {
		childList: true, subtree: true
	});
	// timeout
	var timerId;
	if (timeoutOption != null) {
		timerId = setTimeout(function () {
			_reject(new Error("Not found element match the selector:" + selector));
			observer.disconnect();
		}, timeoutOption);
	}

	return promise;
}
module.exports = waitForElement;
