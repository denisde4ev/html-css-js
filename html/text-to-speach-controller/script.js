		// Check if the browser supports the SpeechSynthesis API
	//if (window.speechSynthesis) {
	//  // Get the list of voices available
	//  var voices = speechSynthesis.getVoices();
	//  // Populate the voice select element with the options
	//  for (var i = 0; i < voices.length; i++) {
	//    var option = document.createElement("option");
	//    option.value = voices[i].name;
	//    option.textContent = voices[i].name;
	//    voiceSelect.appendChild(option);
	//  }
	//}
	
	
	// Get references to the elements on the page
	var textarea = document.getElementById("text");
	var speakButton = document.getElementById("speak-button");
	var pauseButton = document.getElementById("pause-button");
	var resumeButton = document.getElementById("resume-button");
	var stopButton = document.getElementById("stop-button");
	var languageSelect = document.getElementById("language-select");
	var voiceSelect = document.getElementById("voice-select");
	var rateInput = document.getElementById("rate");
	var pitchInput = document.getElementById("pitch");


	if (window.speechSynthesis) {
		var voices = speechSynthesis.getVoices();
	}
	if (!( window.speechSynthesis && voices.length )) {
		alert('❌ your bworser is missing speechSynthesis support or has not languages installed! nothing will work')
	}
	if (window.speechSynthesis) {
		// Populate the language select element with the options
		var languages = new Set();
		voices.forEach(function(voice) {
			languages.add(voice.lang);
		});
		languages.forEach(function(language) {
			var option = document.createElement("option");
			option.value = language;
			option.textContent = language;
			languageSelect.appendChild(option);
		});

		// Populate the voice select element with the options
		function updateVoiceSelect() {
			voiceSelect.innerHTML = "";
			var selectedLanguage = languageSelect.value;
			var filteredVoices = voices.filter(function(voice) {
				return voice.lang === selectedLanguage;
			});
			filteredVoices.forEach(function(voice) {
				var option = document.createElement("option");
				option.value = voice.name;
				option.textContent = voice.name;
				voiceSelect.appendChild(option);
			});
		}

		// Set the selected option in the language select element to the default language of the browser
		languageSelect.value = navigator.language;
		
		updateVoiceSelect();

		// Add an event listener for the language select element
		languageSelect.addEventListener("change", updateVoiceSelect);
	}


	// Create a new SpeechSynthesisUtterance object
	var utterance = new SpeechSynthesisUtterance();
	// Function to handle the speak button click event
	function speak() {
	
		// Set the text of the utterance
		utterance.text = textarea.value;
	
		// Set the voice of the utterance
		utterance.voice = voices.find(function(voice) {
			return voice.name === voiceSelect.value;
		});
	
		// Set the rate and pitch of the utterance
		utterance.rate = rateInput.value;
		utterance.pitch = pitchInput.value;
	
		// Speak the utterance
		window.speechSynthesis.speak(utterance);
	}

 

	if (localStorage.speechSynthesis_supports_pause === 'false') {
		pauseButton.style.display = "none";
		resumeButton.style.display = "none";
	} else {
		function pause() {
			window.speechSynthesis.pause();
			if (speechSynthesis.speaking) setTimeout(_=>{
				if (speechSynthesis.speaking) {
					alert('seems like pause is not supported by your browser.');
					localStorage.speechSynthesis_supports_pause = 'false';
					pauseButton.style.display = "none";
					resumeButton.style.display = "none";
				}
			}, 100)
		}
		pauseButton.addEventListener("click", pause);

		resumeButton.addEventListener("click", function resume() {
			window.speechSynthesis.resume();
		});
  }

	// Function to handle the stop button click event
	function stop() {
		window.speechSynthesis.cancel();
	}

	// Add an event listener for the speak button
	speakButton.addEventListener("click", speak);



	// Add an event listener for the stop button
	stopButton.addEventListener("click", stop);
