var elementReady = function() {





// example cb:
function checkMatchFast(el, checkMatchOptions) {
	if (!(checkMatchOptions.id        != null && el.id === checkMatchOptions.id)                    ) return false; // note: no .toLowerCase to improve performance
	if (!(checkMatchOptions.tagName   != null && el.tagName === checkMatchOptions.tagName)          ) return false;
	if (!(checkMatchOptions.className != null && el.classList.contains(checkMatchOptions.className))) return false;
	if (!(checkMatchOptions.selector  != null && el.matches(checkMatchOptions.selector))            ) return false;

	return el;
}

// works but not needed for now:
//function* walkAllChildElements(root, filter) {
//	const walker = document.createTreeWalker(
//		root,
//		NodeFilter.SHOW_ELEMENT,
//		filter
//	);
//
//	// todo check filter
//	// // Start at the root itself
//	// let node = walker.currentNode;
//	// yield node;
//
//	// Walk the subtree
//	while (node = walker.nextNode()) {
//		yield node;
//	}
//}


/*
const optionCheckNested = {
	id: function(id) { walkAllChildElements(this).find(el => el.id === id) },
	className: function(className) { this.getElementsByClassName(className) },
	tagName:   function(tagName)   { this.getElementsByTagName(tagName) },
	selector:  function(selector)  { this.querySelector(selector) },

	createCheckNestedFromOptions: function(checkMatchOptions) {
		return function(el) {
			if (checkMatchOptions.id        != null && optionCheckNested.id       .call(el, checkMatchOptions.id))        return true;
			if (checkMatchOptions.className != null && optionCheckNested.className.call(el, checkMatchOptions.className)) return true;
			if (checkMatchOptions.tagName   != null && optionCheckNested.tagName  .call(el, checkMatchOptions.tagName))   return true;
			if (checkMatchOptions.selector  != null && optionCheckNested.selector .call(el, checkMatchOptions.selector))  return true;
			return false;
		}
	}
};
*/

/*
function my_checkNested(context, checkMatchOptions) {
	if (checkMatchOptions.id        != null && walkAllChildElements(context).find(el => el.id === checkMatchOptions.id)) return true;
	if (checkMatchOptions.tagName   != null && context.getElementsByTagName(checkMatchOptions.tagName))          return true;
	if (checkMatchOptions.className != null && context.getElementsByClassName(checkMatchOptions.className))      return true;
	if (checkMatchOptions.selector  != null && context.querySelector(checkMatchOptions.selector))                return true;
	return false;
}
*/


/**
 * @typedef {Object} CheckMatchOptions
 * @property {string} [id]
 * @property {string} [tagName]
 * @property {string} [className]
 * @property {string} [selector]
 */

/**
 * @param {Element} context
 * @param {CheckMatchOptions} checkMatchOptions
 * @param {Function} checkMatch
 * @returns {Element}
 */
function getNestedElement(context, checkMatchOptions, checkMatch) {
	return document.createTreeWalker(
		context,
		NodeFilter.SHOW_ELEMENT,
		el => checkMatch(el, checkMatchOptions)
	).nextNode();

	// return walkAllChildElements(context, (el) => checkMatch(el, checkMatchOptions)).find(el => !!el);
	// return walkAllChildElements(context).find(el => checkMatch(el, checkMatchOptions))
}

function elementReady(arg1, context = document.body, checkFirst = true) {
	let resolve,reject;
	var p = new Promise((O,X)=>(resolve=O,reject=X));
	p.resolve=resolve;
	p.reject=reject;


	// Normalize arguments
	let checkMatch;
	let getNested;
	let checkMatchOptions;
	let selector;

	if (typeof arg1 === "string") {
		selector = arg1;
	} else if (typeof arg1 === 'function') {
		checkMatch = arg1;
	} else if (typeof arg1 === 'oject') {
		checkMatchOptions = arg1
		// selector = checkMatchOptions.selector; // better dont, this will cause to match only by selector
		if (checkMatchOptions.selector) {
			checkMatch = el => el.matches(checkMatchOptions.selector) && checkMatchFast(el, checkMatchOptions);
			getNested = context => context.querySelector(checkMatchOptions.selector) && getNestedElement(context, checkMatchOptions, checkMatch);
		} else {
			checkMatch = el => checkMatchFast(el, checkMatchOptions);
			getNested = context => getNestedElement(context, checkMatchOptions, checkMatch);
		}
	} else throw new Error(2);

	if (selector) {
		if (!checkMatch) checkMatch = el => el.matches(selector);
		if (!getNested) getNested = context => context.querySelector(selector);
	} else if (checkMatch) {
		if (!getNested) getNested = context => getNestedElement(context, checkMatchOptions, checkMatch);
	}

	if (!checkMatch) throw 4
	if (!getNested) throw 4;




	// 1. Check immediately
	if (checkFirst) {
		const initial = getNested(context);
		if (initial) return resolve(initial);
	}

	// 2. Observe DOM mutations
	const observer = new MutationObserver((mutationRecords) => {
		for (const record of mutationRecords) {
			for (const node of record.addedNodes) {
				if (!(node instanceof Element)) continue;

				// Direct match
				if (checkMatch(node)) {
					observer.disconnect();
					return resolve(node);
				}

				// Match inside subtree
				const found = getNested(node);
				if (found) {
					observer.disconnect();
					return resolve(found);
				}
			}
		}
	});

	observer.observe(document.documentElement, {
		childList: true,
		subtree: true
	});

	// user might call .resolve probably gave up on waiting and created tehir own instance of the element
	p.finally(() => observer.disconnect());

	return p;
}











return elementReady;
}();
if (typeof module !== 'undefined' && module.exports) {
	module.exports = elementReady;
}
elementReady
