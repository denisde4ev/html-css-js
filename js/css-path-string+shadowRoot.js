

// TODO
// http://ddg.gg/?q=js+minify + some added :
{
let el=$0;let a=[];do{a.unshift(
el.tagName.toLowerCase() /*tag*/
+([].map.call(el.classList,a=>'.'+CSS.escape(a)).join``) /*class*/
+(el.id?'#'+el.id:'') /*id*/
+(''&&  [].map.call(el.attributes,a=>`[${a.name }="${CSS.escape(a.value)}"]`).join``) /*attr*/
)}while(el=el.parentElement,el);

// console.log(a.join('>\n'));
copy(a.join`\n`);

};










// SRC:
{
	let el = $0;
	let a = [];

	let lastWasEl = false; // no last, we dont have to add '>' for the first line
	for (;;) {
		a.unshift(
			el.tagName.toLowerCase() // tag
			+ ( // class
				[].map.call(
					el.classList,
					a => '.' + CSS.escape(a),
				).join``
			)
			+ ( // id
				el.id
				? '#'+ el.id
				: ''
			)

			+ ( // attributes
				''&& // for easy disable 
				[].map.call(
					el.attributes,
					//a => `[${a.name}="${
					//	(a.value
					//		.replaceAll('"',"\\\"")
					//		.replaceAll('\n', '\\a')
					//		.replaceAll('\t', ...)
					//		... // and there are more, better just use CSS.escape
					//	)
					//}"]`,

					a => `[${a.name}="${CSS.escape(a.value)}"]`,
				).join``
			)
		);

		let next = el.parentElement;
		if (next) { el = next; continue; }

		// thanks for the simple demo https://codepen.io/ginpei/pen/yLzaxap
		let rn = el.getRootNode();
		if (rn == document) break;

		a.unshift(
			`#shadow-root (${rn.mode})`
		);

		el = rn.host;

		if (!el) {
			throw new Error('not expected to not get rn.host');
		}

	};

	var result = '';
	var previousWasShadowRoot = null;
	/* values:
	nullish = no previous element
	false = not a shadow root
	true = shadow root
	*/

	for (let el of a) {
		let isShadowRoot =
			el === '#shadow-root (open)'   ? true :
			el === '#shadow-root (closed)' ? true :
			false
		;

		if (isShadowRoot) {
			if (isShadowRoot !== null) result += '\n';
			result += el;
		} else {
			if (previousWasShadowRoot) {
				result += '\n';
			} else if (previousWasShadowRoot !== null) {
				result += ' >\n';
			}

			result += el;
		}

		previousWasShadowRoot = isShadowRoot;
	}


	//console.log( a.join`>\n` )
	//copy( a.join`\n` );
	console.log( result )
	copy( result );
};

// todo: string to js querySelector nested with shadow root seearching
