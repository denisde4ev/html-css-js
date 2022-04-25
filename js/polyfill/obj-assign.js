if (!Object.assign) { // todo move this to separate file and test before loading
	Object.defineProperty(Object, 'assign', {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function(target) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert first argument to object');
			}

			var to = Object(target);
			for (var i = 1; i < arguments.length; i++) {
				var nextSource = arguments[i];
				if (nextSource === undefined || nextSource === null) {
					continue;
				}
				nextSource = Object(nextSource);

				var keysArray = Object.keys(Object(nextSource));
				for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
					var nextKey = keysArray[nextIndex];
					var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if (desc !== undefined && desc.enumerable) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
			return to;
		}
	});
}


// OR
if (!Object.assign)
Object.assign = function(to) {
	if (to == null) throw new TypeError('Cannot convert first argument to object');;

	to = Object(to);
	for (var i = 1; i < arguments.length; i++) {
		var cur = arguments[i];
		if (cur == null) continue;
		cur = Object(cur);

		for (var key in cur) {
			var desc = Object.getOwnPropertyDescriptor(cur, key);
			if (!desc || !desc.enumerable) continue
			to[key] = cur[key];
		}
	}
	return to;
}




if(!Object.assign)Object.assign=function(to){if(to==null)throw new TypeError('Cannot convert first argument to object');to=Object(to);for(var i=1;i<arguments.length;i+=1){var cur=arguments[i];if(cur!=null){cur=Object(cur);for(var key in cur){var desc=Object.getOwnPropertyDescriptor(cur,key);if(desc&&desc.enumerable)to[key]=cur[key]}}}return to}
