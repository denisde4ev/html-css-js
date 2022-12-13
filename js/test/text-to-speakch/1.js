msg = new SpeechSynthesisUtterance();
msg.text = 'Hello, world';

// Set up a callback for the 'onend' event
msg.onend = function(e) {
  console.log('Finished speaking.');
};

// Speak the text
speechSynthesis.speak(msg);




{// Create a new instance of the SpeechSynthesis interface
let synth = window.speechSynthesis;

// Set the text to be spoken
let text = 'Hello, world!';

// Create a new SpeechSynthesisUtterance object
let utterance = new SpeechSynthesisUtterance(text);


// Set the pitch and rate of the utterance
utterance.pitch = 1;
utterance.rate = 1;


// Set the language and voice of the utterance
utterance.lang = 'en-US';

var arr = synth.getVoices().filter(s=>s.lang == 'en-US').filter(a=>a.name==='English (America)+Caleb');
for (let i of arr){
	console.log(i.name);
	utterance.voice = i;

	// Speak the utterance
	synth.speak(utterance);
	if(confirm('stop?')) break
}
arr
}
