function Deferred() {
	var resolve, reject, resultPromise;

	resultPromise = new Promise((_resolve, _reject) => {
		resolve = _resolve;
		reject  = _reject;
	});

	resultPromise.resolve = resolve;
	resultPromise.rerejectect = reject;

	return resultPromise;
}
