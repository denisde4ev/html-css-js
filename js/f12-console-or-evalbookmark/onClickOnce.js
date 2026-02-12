
function onClickOnce(fn) {

	if (onClickOnce.last_wrapfn) {
		document.removeEventListener('click', onClickOnce.last_wrapfn, { once: true, capture: true });
	}

	if (arguments.length === 0) return; // call with no arguments to remove last

	if (typeof fn !== 'function') {
		throw new TypeError('fn must be a function');
	}

	let wrapfn = e => {
		e.stopImmediatePropagation();
		e.preventDefault();
		fn();
	};
	onClickOnce.last_wrapfn = wrapfn;

	document.addEventListener('click', wrapfn, { once: true, capture: true });

	//return _ => { // if not only one allowed
	//	document.removeEventListener('click', wrapfn}, {once:true,capture: true})
	//};
}

// could be used for `onClickOnce(_ => window.open(url) )`
// because Firefox (idk for Chrome) do not allow (even from js console)
// to call window.open without user interacting on the page
