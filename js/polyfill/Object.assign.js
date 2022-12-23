if (!Object.assign) {
	Object.assign = function(target, source) { // only supports 2 args and no error checking
		for (var key in source) {
			if (Object.hasOwn(source, key)) target[key] = source[key];
		}
		return target;
	};
}
