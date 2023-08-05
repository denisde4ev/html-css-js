function cssSelectorAnimationTrigger() {
	// Define style element
	var style = document.createElement('style');

	// Style content
	style.innerHTML = `
		* {
			animation-name: js-cssSelectorAnimationTrigger-test1; 
			animation-duration: 5s; 
	 }
	
	 @keyframes js-cssSelectorAnimationTrigger-test1 { }
	`;
	
	// Append style to head
	document.head.appendChild(style);
	
	// Listen to animation start event
	document.addEventListener('animationstart', function (event) {
		if (event.animationName === 'js-cssSelectorAnimationTrigger-test1') {
			event.target.style.backgroundColor = 'red';
		}
	}, false);

	// Similarly for prefixed events
	document.addEventListener('webkitAnimationStart', function (event) {
		if (event.animationName === 'js-cssSelectorAnimationTrigger-test1') {
			event.target.style.backgroundColor = 'red';
		}
	}, false);

	document.addEventListener('MSAnimationStart', function (event) {
		if (event.animationName === 'js-cssSelectorAnimationTrigger-test1') {
			event.target.style.backgroundColor = 'red';
		}
	}, false);
}
