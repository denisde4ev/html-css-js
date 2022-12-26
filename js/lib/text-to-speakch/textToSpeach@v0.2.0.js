var textToSpeach = function (text, settings) {
	var utterance = new SpeechSynthesisUtterance();
	utterance.voice = speechSynthesis.getVoices().find(voice => ( voice.lang === 'en-US' && voice.name === 'English (America)' ));
	
	textToSpeach = function (text, settings) {
		if (typeof text === 'object') {
			settings = text;
			text = settings.text;
		}
		Object.assign(utterance, settings);
		if (!text) return;
		utterance.text = text;

		var d=[]; d.then=d.push;
		utterance.onend = a=>d.forEach(f=>f(a));
		speechSynthesis.speak(utterance);
		return d;
	};
	returnedValue._utterance = textToSpeach._utterance = utterance;
	return textToSpeach(text, settings);
};

var returnedValue; returnedValue = (t,s) => textToSpeach(t,s);
