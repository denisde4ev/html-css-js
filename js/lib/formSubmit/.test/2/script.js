void function() {
/*
needs feature: for now does not add loading/(disabled while sibmitting) state to button(s)
*/

var outputEl = document.getElementById('loginForm_output');
outputEl.parentElement.childNodes.forEach(e => { if (e.nodeType === Node.TEXT_NODE) e.remove() }); outputEl.innerHTML = '';
function loginForm_output_writeLog(...args) {
	console.log(...args);

	outputEl.insertAdjacentText('beforeend',
		args.map(v =>
			JSON.stringify(v, null, '\t') // TODO: convert `Response` obj to json
		).join(', ') +'\n'
	);
};
window.loginForm_output_writeLog = loginForm_output_writeLog;
var log = loginForm_output_writeLog;





document.addEventListener('submit', e => {
	var form = e.target;
	if (!form.classList.contains('formSubmit')) return;
	if (e.defaultPrevented) {
		console.error(new Error('do not give me event.defaultPrevented'));
		return; // return false;
	}

	loginForm_output.innerHTML = '';

	var form_data    = new FormData(form);
	var form_enctype =                                     form.enctype;
	var form_method  =                                     form.method;
	var form_url     = form.getAttribute('data-action') || form.action;
	//if (e.submitter) {
	//	data.append(e.submitter.name, e.submitter.value);
	//}

	// formdata is always transformed into 'multipart/form-data' when used in fetch (idk if only in fetch)
	var req_body = (
		form_enctype === 'multipart/form-data' ?
			form_data
		:
		form_enctype === 'application/x-www-form-urlencoded' ?
			new URLSearchParams(form_data)
		:

		/* consider/when/if needed: implement:
		'text/plain'
		*/

		form_enctype === 'application/json' ?
			[...form_data]
		:
		/* consider if needs to be obj, and duplicated keys to have arry of all values of the same key {}*/

		(_=>{   throw new Error('unknown enctype: '+form_enctype)}   )()
	);


	log('fetch',[ form_url, {
		method: form_method,
		body_debug_: {
			/* note: fromEntries will overwrite if obj-key is duplicated,
			its fine for debug and current use case
			*/
			form_data: Object.fromEntries(form_data),
		},
		body: req_body,
		headers: { 'Content-Type': form_enctype },
	} ]);

	fetch(form_url, {
		method: form_method,
		body: req_body,
		headers: { 'Content-Type': form_enctype },
		/*redirect - How to handle a redirect response*/
	}).finally(function() {
		log('finally', arguments.length);
	}).then(function (res) {
		//function res_toJson(res) {
		//	var resObj = {};
		//}
		log('then', arguments.length);
		res.json().then(function(obj) {
			log('then.json()', arguments.length, obj);
		})
	}).catch(function (res) {
		log('catch', arguments.length, res);
	});


	e.preventDefault();
});

}();
