

// after 92~110 lines of this file, I quit this file.
// I'll rewrite it in most compact way:
// * no recover from bad Proggramer imput
// * no recover from unexpected Browser modifyers

// note: never tested, case1 logic is complete. it might work.


function KeyboardShortcut(combination) {
	if (typeof combination === 'sting') {
		combination = KeyboardShortcut.humanParseCombination(combination)
	} else if (typeof combination === 'array') ;
	else throw new TypeError([combination]);
}

KeyboardShortcut.browserSupportedModifyers =
	Object.keys(window.KeyboardEvent.prototype)
	.filter(a=>a.endsWith('Key'))
	.map(a=>a.replace(/Key$/s,''))
;
// expected: [ "alt", "ctrl", "shift", "meta" ];

// consider one day to distinguish between left/right modifyer used,
// but for this goal will need to keep track of every keydown/keyup for the modifyers.
// only there is exposed: `event.location=1`/`event.code='AltLeft'`


// human str parse:
// 'Win'/'Super'/'M' -> 'meta'
KeyboardShortcut.humanParse_oneKey = {
	modifyer: s => (
		s = s.toLowerCase(),

		s.length === 1
		? (
			s == 'm' ? 'meta'  :
			s == 'c' ? 'ctrl'  :
			s == 'a' ? 'alt'   :
			s == 's' ? 'shift' :
			null
		)
		: (
			s == 'super' || s == 'win' || s == 'os'  ? 'meta' :
			KeyboardShortcut.browserSupportedModifyers.includes(s) ? s :
			null
		)

	),

	key: s => (
		s // idk, for now no special cases
	),

};

KeyboardShortcut.humanParse = (modifyers_, key_) => {
	// args: (modifyers_: arr, key_ str (possibly with len of 1))

	if (modifyers_) {
		var modifyers = modifyers_.split('').map(KeyboardShortcut.humanParse_oneKey.modifyer);
		if (!modifyers) throw new TypeError(['cant parse:', modifyers_]);
		if (!key_) return modifyers;
	}

	if (key_) {
		var key = KeyboardShortcut.humanParse_oneKey.modifyer(key_);
		if (!key) throw new TypeError(['cant parse:', key_]);
		if (!modifyers_) return key;
	}

	return [modifyers, key];
};

KeyboardShortcut.humanParseCombination = str => {
	// return structure: [ [...modifyers], key ], example: [ ['ctrl','shift'], 's' ]

	case1: { // when 'CS-s'/'CS + s'/'CSs'/'CS s' -> 'Ctrl' 'Shift' 'S' (note: might be just 's')
		// note/TODO!!!: when 'CTRL+S' will throw 'cant parse', then needs to recover from error
		var case1 = str.match(/([A-Z]+)?(?:[-+ ]|\s[-+]\s)?([a-z])/s);
		if (!case1) break case1;

		var [_, modifyers_, key] = case1; // note: modifyers_: 'CS' (unsplit), but it might also be 'CTRL' for case2

		var case1ParseCase2_modifyers;
		if (
			2 <= modifyers_.length && // len of 1 will be the same for both case1 and case2 --> no need to `goto case2`
			(case1ParseCase2_modifyers = KeyboardShortcut.humanParse_oneKey(modifyers_)) &&
		true) {
			// do note: for now, no need to `goto case2` for 1 return
			return KeyboardShortcut.humanParse(case1ParseCase2_modifyers, key);
		}
		var modifyers = modifyers_.split();

		return KeyboardShortcut.humanParse(modifyers, key);
	}

	caes2: { // when 'Ctrl-S'/'Ctrl+s'/'Ctrl + S'/'Ctrl S'
		if (!modifyers || !key) {
			// todo:!!! here parse
		}
		return KeyboardShortcut.humanParse(modifyers, key);
	}

	return o
};

