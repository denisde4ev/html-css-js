{
	let i = $0;
	let a = [];
	do {
		a.unshift(
			i.tagName
			+ ([].map.call(
				i.classList,
				a=>'.' + a
			).join`` || '')
			+ ((i.id && '#')
			+ i.id || '')
		);
	} while ((i = i.parentElement, i));
	console.log(a.join('\n'))
};
