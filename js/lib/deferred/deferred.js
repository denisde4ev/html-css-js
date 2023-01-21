function D(obj){
	if (!(this instanceof D)) return new D(obj);
	obj = obj || {};

	this._state    = 'new';
	this._okbacks  = [];
	if (!obj.resolvableOnly) this._errbacks = [];

//	this._return     = obj.return; // not used for now
//	this._arguments  = obj.arguments;
	this._callOnce   = obj.callOnce == null ? true : obj.callOnce; // callOnce: true by def.
}

Object.assign( D.prototype, {
	_cal: function(arr, call_arguments) {
		//var returned;

//		arr[this._renurn === 'eventlike' ? 'every' : 'forEach' ](function(fn){
		arr.forEach(function(fn){
			try {
				return fn.apply(this, call_arguments);
//				returned = fn.apply(this, call_arguments);
//				if (this._renurn === 'eventlike' && returned === false) return returned; 
//				if (this._arguments === 'promiselike') call_arguments = returned; // not used for now
			} catch (e) {
				console.error(e);
				return true;
			}
		}, this);

		if (this._callOnce) {
			this._okbacks = null;
			this._errbacks = null;

			this.resolve = this.reject = this._alreadyFired;
		}
		//return returned; // return false if preventDefault
	},
	
	_alreadyFired: function() {
		throw new Error('Defferred(callOnce) promise have already been fired');
	},

	always: function(fn) {
		if (this._state == 'new' || this._callOnce === false) {
			this._okbacks .push(fn);
			this._errbacks.push(fn);
		} else {
			fn.apply(this, this._called_arguments);
		}
		return this;
	},
	
	then: function(fn) {
		if (this._state != 'called' || this._callOnce === false) {
			this._okbacks.push(fn);
		} else {
			fn.apply(this, this._called_arguments);
		}
		return this;
	},

	catch: function(errback) {
		if (this._state != 'failed' || this._callOnce === false) {
			this._errbacks.push(errback);
		} else {
			errback.apply(this, this._called_arguments);
		}
		return this;
	},

	// note maybe add resolveWith

	resolve: function() {
		this._state = 'called';
		this._called_arguments = arguments;
		return this._cal(this._okbacks, arguments)
	},

	reject: function() {
		this._state = 'failed';
		this._called_arguments = arguments;
		return this._cal(this._errbacks, arguments);
	}
});

if (typeof module !== 'undefined') module.exports.D=D;
