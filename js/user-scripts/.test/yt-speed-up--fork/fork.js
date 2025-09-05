// ==UserScript==
// @name         Youtube Speed Up
// @namespace    http://tampermonkey.net/
// @version      0.1.3
// @description  Youtube Speed at 10x
// @author       me
// @match        https://www.youtube.com/*
// @grant        none
// downloadURL https://update.greasyfork.org/scripts/421610/Youtube%20Speed%20Up.user.js
// updateURL https://update.greasyfork.org/scripts/421610/Youtube%20Speed%20Up.meta.js
// @run-at     @document-start
// ==/UserScript==

(function() {
	'use strict';

	const SPEED_SETTINGS_ARR = [0.25,0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,5,6,7,8,9,10];
	//const SPEED_SETTINGS_ARR = [0.25,0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,4,4.25,4.5,4.75,5,5.25,5.5,5.75,6,6.25,6.5,6.75,7,7.5,8,8.5,9,9.5,10]};


	function updateAvailablePlaybackRates() {
		var path = '';

		if(typeof _yt_player === "undefined"){
			console.log("Something goes wrong with _yt_player variable");
			return;
		}

		// Thanks to him: https://stackoverflow.com/a/48051090
		function findAvailablePlaybackRates(objectToSave, prep) {

			var count = 0;
			var objectToSaveKeys = Object.keys(objectToSave);
			for (var i in objectToSave) {
				//Little Fix because they could be null
				let k = objectToSaveKeys[count];
				if (k && objectToSave[k]) {
					//function to be injected
					if (k == "getAvailablePlaybackRates"){
						//save the path
						path = (prep===""?"":prep+".")+k;
					}
					//we can stop here!!
					if (path !== '') return;

					//Useless for this purpose
					//if(objectToSave[i].constructor.name == "Object" || objectToSave[i].constructor.name == "Array")
					//    findAvailablePlaybackRates(objectToSave[i],prep);

					var objOfObj = objectToSave[k];

					//getAvailablePlaybackRates is hidden somewhere do deeper!!
					if (
						 typeof objOfObj !== "undefined" &&
						 objectToSave[i].constructor.name == "Function" &&
						 Object.keys(objOfObj).length !== 0 &&
					true) {
						var incount = 0;
						for (var j in objOfObj){
							//I don't know but ok JS!
							if(typeof objOfObj !== "undefined"){
								findAvailablePlaybackRates(objOfObj[j],(prep===""?"":prep+".")+k+"."+Object.keys(objOfObj)[incount]);
							}
							//we can stop here!!
							if (path !== '') return;
							incount++;
						}
					}
				}
				count++;
			}
		}

		findAvailablePlaybackRates(_yt_player, "");
		console.log("Path detected at _yt_player." + path);

		//recursion to inject a new function!!
		function setAvailablePlaybackRates(path,index,splitted) {
			if (splitted.length - 1 == index){
				//over 8x it's muted!!!!!
				path[splitted[index]] = function() { return SPEED_SETTINGS_ARR; };
			} else setAvailablePlaybackRates(path[splitted[index]],index+1,splitted);
		}

		setAvailablePlaybackRates(_yt_player, 0, path.split('.'));
	}


	 function runUpdateAvailablePlaybackRates() {
		if (typeof _yt_player === "undefined") {
			var interval = setInterval(function() {
				if (typeof _yt_player !== "undefined") {
					clearInterval(interval);
					updateAvailablePlaybackRates();
				}
			}, 5);
		} else {
			updateAvailablePlaybackRates();
		}
	}

	function debounceCallFn(fn, ms) {
		var locked = false;
		return () => {
			if (!locked) fn();
			setTimeout(_ => {
				locked = false;
			}, ms);
		};
	}

	var runUpdateAvailablePlaybackRates_debounced = debounceCallFn( runUpdateAvailablePlaybackRates, 10 );

	function mainRun(calledBy) {
		console.log('yt-speed-change: note, calledBy:', calledBy);
		runUpdateAvailablePlaybackRates_debounced();
	}

	mainRun();




		//https://stackoverflow.com/a/52809105----
	history.pushState = (function(f) { // intersept 'history.pushState'
		return function pushState() {
			mainRun('history.pushState');
			return Reflect.apply(f, this, arguments);
		}
	}) (history.pushState);

	history.replaceState = (function(f) { // intersept 'history.replaceState'
		return function replaceState(){
			mainRun('history.replaceState');
			return Reflect.apply(f, this, arguments);
		}
	}) (history.replaceState);

	window.addEventListener('popstate', () => mainRun('popstate')); // event 'popstate'

	//https://stackoverflow.com/a/45956628----
	//youtube wtf events
	//new layout > 2017
	window.addEventListener("yt-navigate-finish", () => mainRun('yt-navigate-finish')); // event 'yt-navigate-finish'

	//old layout < 2017
	window.addEventListener("spfdone", () => mainRun('spfdone')); // event 'spfdone'


	window.addEventListener('locationchange', () => mainRun('locationchange') ); // event 'locationchange'

})();
