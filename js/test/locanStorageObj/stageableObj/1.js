
/* // todo: fn not well tested
function findDirectConstructor(obj, constructor) {
	if (!obj) return null;
	if (Object.hasOwn(obj, 'constructor') && obj.constructor === constructor) {
		return obj;
	}
	return findDirectConstructor(Object.getPrototypeOf(obj), constructor)
}
*/

var UpDownTransform = function(local, remote, transform, options) {
	if (transform == null) transform = {__proto__:null};
	if (!('up'   in transform)) transform.up   = (o,k) => o.l[k] = o.r[k];
	if (!('down' in transform)) transform.down = (o,k) => o.r[k] = o.l[k];

	this.l = this.remote = remote;
	this.r = this.local  = local;
	this.transform = transform;
	// transform: {
	//  up(that, key),
	//  down(that, key)
	// }
	// if no extra valitadion is needed that can be used as self obj
	this.options = options; // optional
};

UpDownTransform.prototype.up = function(key) {
	return this.transform.up(this, key/*, findDirectConstructor(this)*/);
}
UpDownTransform.prototype.down = function(key) {
	return this.transform.down(this, key/*, findDirectConstructor(this)*/);
}

UpDownTransform.prototype.upMany = function() {
	var keys = arguments.length !== 0 ? arguments : Object.keys(this.local);
	for (let key of keys) this.transform.up(this, key/*, findDirectConstructor(this)*/);
	return this;
};
UpDownTransform.prototype.downMany = function() {
	var keys = arguments.length !== 0 ? arguments : Object.keys(this.remote);
	for (let key of keys) this.transform.down(this, key/*, findDirectConstructor(this)*/);
	return this;
};


// untested and unfinished:
//UpDownTransform.prototype.upManyAdvanced = function(options, keys) {
//	if (!( options = options || this.options )) throw new TypeError('mising options');
//	keys = keys || options.keys || Object.assign(Object.keys(this.local), options.additinalKeys);
//	for (let key of keys) this.transform.up(this, key, findDirectConstructor(this));
//	if (options.deleteRemoved) // todo: compare remove in other obj
//	return this;
//};
//UpDownTransform.prototype.downManyAdvanced = function(options, keys) {
//...
//};





var localStorage_upDown = new UpDownTransform(
	{},
	localStorage,
	{
		up({local,remote}, key) {
			if (local.hasOwnProperty(key)) {
				remote.setItem(key, local[key]);
			}
		},
		down({local,remote}, key) {
			if (localStorage.hasOwnProperty(key)) {
				return local[key] = eval(remote.getItem(key)); // do not down prop if localStorage does not have it
			}
		},
	}
);