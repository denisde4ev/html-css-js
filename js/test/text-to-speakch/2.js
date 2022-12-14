
//var D = d=>(d=[],d.then=d.push,d.resolve=a=>d.forEach(f=>f(a)),d);
//if (!Promise.Deferred) {
//	Promise.Deferred = function () {
//		var res, rej;
//		var p = new Promise((res_,rej_) => {
//			res = res_;
//			rej = rej_;
//		});
//		p.resolve = res;
//		p.reject = rej;
//		return p;
//	};
//}


// lazy load the fn (this might get cache issues)
function textToSpeach(text, settings) {
	if (arguments.callee !== textToSpeach) throw new ReferenceError('fn textToSpeach has been redefined but old fn called');;

	// Create a new instance of the SpeechSynthesis interface
	var synth = window.speechSynthesis;

	// Create a new SpeechSynthesisUtterance object
	var utterance = new SpeechSynthesisUtterance();


	// Set the default pitch and rate of the utterance
	utterance.pitch = 1;
	utterance.rate  = 1;
	// Set the default language and voice of the utterance
	utterance.lang = 'en-US';


	utterance.voice = synth.getVoices().find(voice => (
		voice.lang === 'en-US' &&
		voice.name === 'English (America)'
	));
	


	textToSpeach = function (text, settings) {
		if (typeof text === 'object') {
			settings = text;
			text = settings.text;
		}

		// Set the text to be spoken
		Object.assign(utterance, settings);
		if (!text) return;

		utterance.text = text;

		return new Promise.resolve(res => {
			utterance.onend = res;
			synth.speak(utterance);
		});
	};

	return textToSpeach(text, settings)
}

// todo consider using module.export


//if (false && false && false && false) {
//(async _=>{
//	var sleep = sec => {
//		var d = D();
//		setTimeout(d.resolve, sec *1e3);
//		return d;
//	}
//
//	textToSpeach({rate:5}) // just change settings
//
//	for (let text of ['this', 'is', 'just', 'a',,, 'test']) {
//		await textToSpeach(text); //console.log('await textToSpeach("'+text+'");')
//		await sleep(.5); //console.log('await sleep(1);')
//	}
//})()

/*
await textToSpeach("this");
await sleep(1);
await textToSpeach("is");
await sleep(1);
await textToSpeach("just");
await sleep(1);
await textToSpeach("a");
await sleep(1);
await textToSpeach("undefined");
await sleep(1);
await textToSpeach("undefined");
await sleep(1);
await textToSpeach("test");
await sleep(1);
*/


}
