// ==UserScript==
// @name         change video speed by '[=]' keys
// @version      0.1
// @description  hi
// @include      https://*
// @include      http://*
// @grant        none
// @run-at       document-end
// ==/UserScript==
void function(){'use strict';





//{ // min.js
//	var $ = document.querySelector.bind(document);
//	$.new = document.createElement.bind(document);
//	Node.prototype.val = function (key, value){ this[key] = value; return this; };
//	// Node.prototype.attr = function (){ this.setAttribute.apply(this,arguments); return this; };
//	//Node.prototype.on = function (event, fn){ this.addEventListener(event, fn, false); return this; };
//	//NodeList.prototype.on = function (event, fn){ this.forEach( function(v){v.on(event,fn)} ); return this; };
//}


var videoPlayer = document.querySelector('video');
var visual = document.createElement('div');
visual.style = 'text-align: end; position: relative; background: black; border-radious: .3em; z-index: 999';
videoPlayer.insertAdjacentElement('afterend', visual);

document.addEventListener('keydown', function changeSpeed(e) {
	var i = (
		e.key == '[' ? -1 :
		e.key == '=' ? 0 :
		e.key == ']' ? 1 :
		NaN
	);
	if (isNaN(i)) return;

	var curr = videoPlayer.playbackRate;
	var speed;
	if (i === 0) {
		speed = 1; // INITIAL_PLAYBACK_RATE
	} else {
		speed =
			curr <= 1
				?
					i ==  1 ? curr *= 2 :
					i == -1 ? curr /= 2 :
					NaN
				:
					curr += i
		;
	}
	if (isNaN(speed)) throw speed;

	visual.innerText = videoPlayer.playbackRate = speed;
	visual.style.display = 'block';
	setTimeout(_ => visual.style.display = 'none', 0.5e3);
});






// twitch buttons
/*
if (window.title.contains('Twitch')) {

{{
	//var speed = (
		// e.type == 'click' ?
		// 		this === increaseBtn ?  1 :
		// 		this === decreaseBtn ? -1 :

}}
{{
	// if ( e.type == 'keydown' &&
	//if ( !/[\[=\]]/.test(e.key) ) return;
}}

	{
		let windowLocation = '';
		let timerBtns = setInterval(() => {
			windowLocation = window.location.href;
			if(
				!windowLocation.includes('https://www.twitch.tv/videos/') &&
				!windowLocation.includes("/clip/")
			) {
				buttons.forEach(btn => { btn.style.display = "none"; });
			} else {
				buttons.forEach(btn => { btn.style.display = "flex"; });
			}
		}, 3.5e3);
	}
	var primeBtn = $(".top-nav__prime");

	var 
		decreaseBtn = $.new("button").val('textContent', '>'), 
		resetBtn    = $.new("button").val('textContent', '='), 
		increaseBtn = $.new("button").val('textContent', '<'),
		buttons = [ decreaseBtn, resetBtn, increaseBtn ]
	;

	buttons.forEach(btn => {
		btr.on('click', changeSpeed);
		primeBtn.insertAdjacentElement('beforebegin', btn);
		btn.classList.add('btnClassPlayspeed');
		btn.style = `
			display: flex;
			background-color: black;
			border: 2px solid white;
			border-radius: 2px;
			padding: 0 7px 3px 7px;
			margin-right: 10px;
			margin-bottom: 7px;
			zIndex: 2000;
		`;
	});
}
*/





}();
