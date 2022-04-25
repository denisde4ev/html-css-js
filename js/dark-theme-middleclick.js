
/// middle click to togle dark mode
var HTML = document.documentElement;
void function(){
	if (!(   window.localStorage && window.localStorage.theme  )) return;
	var theme = window.localStorage.theme;
	if ( theme !== 'light' && theme !== 'dark' ) throw theme;

	if (theme !== 'light') [].forEach.call(document.querySelectorAll('[media="(prefers-color-scheme: dark)"]'),function(v){v.media=''});
	

	HTML.setAttribute('data-theme', theme);
}();
window.addEventListener('mousedown', function (e) {
  if (!(  e.which == 2 || e.button == 4  )) return;
	var theme = HTML.getAttribute('data-theme');
	HTML.setAttribute(
		'data-theme',
		( window.localStorage.theme=
			theme
				? theme === 'light'
					? 'dark'
					: theme === 'dark'
						? 'light'
						: null
				: window.matchMedia
					&& (
						[].forEach.call(document.querySelectorAll('[media="(prefers-color-scheme: dark)"]'),function(v){v.media=''})
						,
						window.matchMedia('(prefers-color-scheme: dark)').matches
							? 'light'
							: window.matchMedia('(prefers-color-scheme: light)').matches
								? 'dark'
								: null
					) 
		) || ['dark','light'][Math.random()>.5|0]
	);
});

