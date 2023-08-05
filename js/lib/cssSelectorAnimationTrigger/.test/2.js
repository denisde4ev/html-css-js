void function cssSelectorAnimationTrigger_test1(selector) {
	// Define style element
	var style = document.createElement('style');

	// Style content
	style.innerHTML =
		(selector || '')+'.run-animation {'+
		'	animation-name: js-cssSelectorAnimationTrigger-test1; '+
		//'	animation-duration: 5s; '+
	 '}'+
		''+
	 '@keyframes js-cssSelectorAnimationTrigger-test1 { }'+
	'';

	// Append style
	(document.head || document.documentElement).appendChild(style);

	// Listen to animation start event
	document.addEventListener('animationstart', function (event) {
		if (event.animationName === 'js-cssSelectorAnimationTrigger-test1') {
			// make the background color red as a test
			event.target.style.backgroundColor = 'red';
		}
	});
}();
