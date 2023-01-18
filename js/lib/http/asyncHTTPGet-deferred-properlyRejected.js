
function asyncHTTPGet(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true); // true => async request
	xhr.send();

	// todo use  rejectable deferred call once
	var o = [];
	var x = [];

	// and hope external fn wont change `r.xhr.onload/.onerror/.onloadend`
	var r = { xhr: xhr, then: f=>(o.push(f),r), catch: f=>(x.push(f),r) };

	// TODO: not tested if eather event will get executed, (what about .onabort?)
	xhr.onload = e => {
		var s = xhr.status;
		xhr._ok = s === 0  || 200 <= s && s < 400;
		if (!xhr._ok) return xhr.onerror(e);

		o.forEach(f => f(e, xhr))
	};
	xhr.onerror = e => {
		if (!x.length) throw new Error(e);
		x.forEach(f => f(e, xhr))
	};
	xhr.onloadend = e => { r.then = r.catch = null; }

	return r;
}
if (typeof module !== 'undefined') module.exports.asyncHTTPGet = asyncHTTPGet;


if (false) { let asyncHTTPGetText, asyncHTTPGetJSON;
	asyncHTTPGetText = async function asyncHTTPGetText(url) {
		var p = asyncHTTPGet(url); // p = promise
		//p.catch(e=>{
		//	throw e; // throw in async function to trigger `.reject()`
		//});
		return (await p).target.responseText;
	}
	asyncHTTPGetJSON = async function asyncHTTPGetJSON(url) {
		var p = asyncHTTPGet(url); // p = promise
		//p.catch(e=>{
		//	throw e; // throw in async function to trigger `.reject()`
		//});
		var res = (await p).target;
		if (!/^(application|text)\/(x-)?json($|;)/i.test(res.getResponseHeader('Content-Type'))) {
			throw new Error('response Content-Type is not JSON');
		}
		return JSON.parse(res.responseText);
	}

	if (false) { // just testing async/await (does not work as expected, only and only 'captured' is triggered and never `catch (e) { ...; }`):
		try {
		(async _=>{
			try {
			//debugger
				var a =  (await (asyncHTTPGet('https://swapi.dev/apiiiiiiiiii').catch(e=>{console.info('captured', e);})));
				debugger
				return a.target.responseText;
			} catch (e) {
				console.info('in catch');
				console.error(e);
			}
		})().catch(e=>{
			console.log('err on top lvl', e)
		}).then(e=>{
			console.log('no err on top lvl', e)
		})
		
		} catch (e) {
		console.error('err on top thr', e)
		}
	
	} 
}
