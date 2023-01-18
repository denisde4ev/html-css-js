

// acts like `new D({callOnce: false});` from deferred.js



// option using constructor:
function D() {
	if (!(this instanceof D)) return new D();

	this.o = [];
	this.x = [];
}
Object.assign(D.prototype,{
		then(f)  { this.o.push(f); },
		catch(f) { this.o.push(f); },
		resolve(...a) { this.o.forEach(f=>f(...a); },
		reject (...a) { this.x.forEach(f=>f(...a); },
});


// or using arrow function with no prototype to save some bytes
if (false) {
	let D = (o,x) => (
		{
			o:o=[],
			x:x=[],
			then(f){o.push(f)},
			catch(f){x.push(f)},
			resolve(...a){o.forEach(f=>f(...a))},
			reject(...a){x.forEach(f=>f(...a))},
		}
	)
}


if (typeof module !== 'undefined') module.exports.D=D;

