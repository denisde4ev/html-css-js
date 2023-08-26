
// current goal of this script is to be compact (unlike ../../.test/1)!
// no arguments recover/validation.
// assume everything is correct
// (exept if known to be the opposite)

// just noting: result of this "compact code" is more comments, more integration from lib calls



var keybinding = function(combination, cb, options) {
	// (strict args, no args recover) args:
	// when 1 arg: (combination) // listening globally
	// `combination = [ [...modifyers], key]`,
	// example: [ ['ctrl', 'shift'], 's' ] (always in lower case)
	// `this`=element to listen for keydown, use `.call(element, ...args)`


	// consider validating args, for now not needed

	return this.addEventListener(
		'keydown',
		keybinding.KeydownEventCB(
			combination,
			cb
		),
			options
	);
};


keybinding.KeydownEventCB = (combination, cb) => event => // expose creation of eventCB in order to give more control
	keybinding.isEventCombination(combination, event)
	? cb.call(this, event)
	: void 0
;


{
keybinding.browserSupportedModifyers =
	Object.keys(window.KeyboardEvent.prototype)
	.filter(a => a.endsWith('Key'))
	//.map(a => a.replace(/Key$/s,''))
;
// expected: [ 'altKey', 'ctrlKey', 'shiftKey', 'metaKey' ];

// if user of this lib (the programmer)
// wants to get error if modifyer key
// is not avalible on the browser:
// should iterate over this array
}

keybinding.isEventCombination = (combination, event) =>
	//void (console.log(combination, event, combination[1] === event.key,
	//keybinding.browserSupportedModifyers.map(k =>
	//	event[k] === combination[0].includes(k)
	//	// note: (event={shiftKey: true})[k='shiftKey'] === ['shiftKey'].includes(k='shiftKey')
	//))) ||
	combination[1] === event.key
	&&
	keybinding.browserSupportedModifyers.every(k =>
		event[k] === combination[0].includes(k)
		// note: (event={shiftKey: true})[k='shiftKey'] === ['shiftKey'].includes(k='shiftKey')
	)

	// meant to be used as `combination[2] = { repeat: false }`
	// it seems that on my current browser FF106 this feature is broken?! (it might be (Wayland communication with Firefox) tho)
	// however on chrome based Edge it works
	// its still repeat:false even for holding the key
	// (
	// its eather `true` value
	// when I release the key and press it back .... idk F!
	// )
	&&
	(
		!combination[2] ||
		Object.entries(combination[2]).every(([k,v]) => event[k] === v )
	)

;



if (typeof module !== 'undefined') module.exports = keybinding;
keybinding; // returned to eval



//if (1) {
//	keybinding([['ctrlKey'], 'x', { repeat: false }], e => {
//		console.log('Ctrl+X')
//	});
//};
