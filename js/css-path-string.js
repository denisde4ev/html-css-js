//copy(function(){

{
	let el = $0;
	let a = [];
	do {
		a.unshift(
			el.tagName.toLowerCase() // tag
			+ ( // class
				[].map.call(
					el.classList,
					a => '.' + a, // TODO: not propperly escaped
				).join`` || ''
			)
			+ ( // id
				el.id
				? '#'+ el.id
				: ''
			)

			+ ( // attributes
				//''&& // for easy disable 
				[].map.call(
					el.attributes,
					a => `[${a.name}="${a.value}"]`, // TODO: not excaped
				).join``
			)
		);
	} while ((el = el.parentElement, el));

	//console.log(a.join('\n'))
	//return a.join('\n')
	copy( a.join('\n') );
};

//}());
