

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
	do {
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
	} while ( el = el.parentElement, el );

	//console.log(a.join`>\n`)
	copy( a.join`\n` );
};
