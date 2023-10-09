#!/usr/bin/env node

function Object_defineProxyApply(target, key, fn) {
	var oldfn = target[key];
	target[key] = function() {
		return fn.call(target, this, arguments, oldfn);
	};
}

if(0)_=>
{
	function Function_wrapApply(target, kkey, fn) {
		var oldfn = target[key];
		return function() { return fn.call(target, this, arguments, oldfn); };
	}
	function Object_defineProxyApply(target, key, fn) {
		target[key] = Function_wrapApply(target, key, fn);
		return this;
	}
}
