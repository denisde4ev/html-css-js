u// fork of https://github.com/bzhn/vampire-translator/tree/dc53a49
void function(){'use strict';

var dict = (_=>{



var possible = Object.keys(dict);
 

function decryption() {
	rawText = document.getElementById("raw").value;
	toChange = rawText.split('');
	var toChangeLength = toChange.length;
	var result = '';
	for (let i = 0; i < toChangeLength; i++) {
		if (possible.indexOf(toChange[i]) != -1){
			result += dict[toChange[i]];
			console.log(dict[toChange[i]]);
		}
		else {
			result += toChange[i];
		}
	}
	document.getElementById("modified").value = result; // = toChange;
	return(result);
}

function duckIt () {
	text = decryption();
	window.open("https://duckduckgo.com/?q=" + encodeURIComponent(text));
}



}();
