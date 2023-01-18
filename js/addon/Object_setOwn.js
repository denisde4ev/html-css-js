Object.setOwn = (o, k, v) => Object.defineProperty(o, k, {
	value: v,
	writable: true,
	enumerable: true,
	configurable: true
});
