
// warning: custom fn to native API!
speechSynthesis.getVoice = function(filter) {
	//if (filter instanceof SpeechSynthesisVoice) return options; // filter is voice itself...

	var filter_keys = Object.keys(filter);
	if (!(0<filter_keys.length)) {
		throw new TypeError('filter does not have at least one key prop to copare');
	}

	return this.getVoices().find(i => (
		filter_keys.every(k=> i[k] === filter[k])
	));
}


var textToSpeach = function init(text, settings) {
	var utterance = new SpeechSynthesisUtterance();
	var voice_default = speechSynthesis.getVoice({
		name: 'English (America)',
		lang: 'en-US',
	});
	if (voice_default) {
		utterance.voice = voice_default;
	} else {
		console.warn('default voice is missing from speechSynthesis.getVoice');
	}

	textToSpeach = function main(text, settings) {
		if (typeof text === 'object') {
			settings = text;
			text = settings.text;
		}

		if (settings) {
			if (
				Object.hasOwn(settings, 'voice') &&
				!(settings.voice instanceof SpeechSynthesisVoice) &&
			0) {
				// NOTE:! unpure fn textToSpeach! changing external obj
				settings.voice = speechSynthesis.getVoice(settings.voice);
			}
			Object.assign(utterance, settings);
		}

		if (!text) return utterance;
		utterance.text = text;

		if (utterance.onend && utterance.onend.reject) {
			utterance.onend.reject('text changed');
		}

		return new Promise((r,j) => {
			utterance.onend = r;
			utterance.onerror = r.reject = j;
			speechSynthesis.speak(utterance);
		});
	};


	textToSpeach._utterance = utterance;
	if (typeof module !== 'undefined') {
		module.exports.textToSpeach._utterance = utterance;
	}

	return textToSpeach(text, settings);
};


if (typeof module !== 'undefined') {
	module.exports.textToSpeach = (
		(t,s) => textToSpeach(t,s)
	);
}
