

var keyboardLayouts= {

	physicalQwerty: [ // related ref: https://developer.mozilla.org/en-US/docs/Web/API/Keyboard_API#writing_system_keys
		   "Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal",

		                  "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash",
		                    "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote",
		/*"IntlBackslash", */ "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash",
	]
	,
	qwerty:
		`\`1234567890-=`+
		`qgmlwyfub;[]\\`+ // _fix:`
		`dstnriaeoh'`+
		`zxcvjkp,./` // '\\':'\\'
	,
	bg:
		`ю1234567890-=`+
		`чшертъуиопящь`+
		`асдфгхйкл;'`+
		`зжцвбнм,./` // '\\':'ѝ'
	,
	bgShift:
		`Ю!@№$%€§*()–+`+
		`ЧШЕРТЪУИОПЯЩѝ`+
		`АСДФГХЙКЛ:"`+
		`ЗЖЦВБНМ„“?`  // '\\':'\\'
	,

}

if (typeof module !== 'undefined') module.exports.keyboardLayouts = keyboardLayouts;
return keyboardLayouts;
}());
