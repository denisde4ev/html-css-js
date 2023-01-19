
var open_json = json => (
	open('data:application/json;charset=UTF-8,' +
		encodeURIComponent(
			typeof json === 'object'
			? JSON.stringify(json)
			: json
		)
	)
);

if (typeof module !== 'undefined') module.exports.open_json = open_json;

0&& // test
open_json({a:1, b:2, c: { cc: 33 } });

