/*
for now does not add loading/(disabled while sibmitting) state to button(s)
*/

document.addEventListener('submit', e => {
	var form = e.target;
	if (!form.classList.contains('formSubmit')) return;
	if (e.defaultPrevented) {
		console.error(new Error('do not give me event.defaultPrevented'));
		return; // return false;
	}

	var form_data    = new FormData(form);
	var form_enctype =                                     form.enctype;
	var form_method  =                                     form.method;
	var form_url     = form.getAttribute('data-action') || form.action;
	//if (e.submitter) {
	//	data.append(e.submitter.name, e.submitter.value);
	//}

	fetch(form_url, {
		method: form_method,
		body: form_data,
		headers: {
			'Content-Type': form_enctype
		},
		/*redirect - How to handle a redirect response*/
	}).finally(function (_) {
		console.info('finally', arguments.length );
	}).then(function (res) {
		console.info('then', arguments.length, res );
	}).catch(function (res) {
		console.info('catch', arguments.length, res );
	});

	e.preventDefault();
});
