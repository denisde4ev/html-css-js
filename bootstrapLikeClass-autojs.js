$(function(){
	var rex = /(^| )((?:(?<short_key_1>p|m))(?<short_key_1_append>-(?:top|right|bottom|left))?-(?<val_1>auto|[0-9]+(?:\.[0-9]+)?(?<val_1_>em|rem|px)?)|(?<short_key_2>w)-(?<val_2>auto|none))(?= |$)/gsm
	window._data.css=''
	var map_short_key = {
		p: 'padding',
		m: 'margin',
		w: 'width'
	};
	[].forEach.call(document.all, function (elem) {
		var matall = (elem.className+'').matchAll(rex);
		for(let mat of matall) {
			var {
				short_key_1, short_key_1_append, val_1, val_1_,
				short_key_2, val_2
			} = mat.groups;
			var key,val;

			if (short_key_1) {
				key = map_short_key[short_key_1] + short_key_1_append;
				val = val_1 + (val_1_||'em');
			} else if (short_key_2) {
				key = map_short_key[short_key_2];
				val = val_2;
			}

			var old = getComputedStyle(elem)[key];
//			elem.style[key]=val+' !important';
			elem.style.setProperty( key, val , 'important');
			if (old && old === getComputedStyle(elem)[key]) return console.log('ok for .'+mat[0]);
			window._data.css+=`.${mat[0]} { ${key}: ${val} !important; }\n`
		}
	});

	console.log('toadd: { \n'+window._data.css. split('\n').filter((v,i,arr)=>arr.indexOf(v,i+1)===-1).join('\n') + '\n}\n')

})
