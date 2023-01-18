
function asyncHTTPGet(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true); // true => async request
	xhr.send();

	var p = new Promise((o,x)=>{
		// TODO: not tested if eather event will get executed, (what about .onabort?)
		xhr.onload = e => {
			var s = xhr.status;
			xhr._ok = s === 0  || 200 <= s && s < 300;
			if (!xhr._ok) return x(e);

			o(e);
		};
		xhr.onerror = x;
	})
	// and hope external fn wont change `r.xhr.onload/.onerror/.onloadend`
	p.xhr = xhr;
	return p;
}
if (typeof module !== 'undefined') module.exports.asyncHTTPGet = asyncHTTPGet;


//if (false) { let asyncHTTPGetText, asyncHTTPGetJSON;
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
//}
