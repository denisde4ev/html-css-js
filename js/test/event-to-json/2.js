function mapObjAndProtoToJsonableObj(obj) {
// meant to be executed on event obj
// IMPORTANT NOTE: all key are going to be get from obj itself `o[ii_key]` not from current __proto__



var i = obj;
var o = {__proto__:null};

for (
	let ii = i, _iiR, _iiO, oo = o, oo_next;
	ii;
	(
		_iiR = Reflect.getPrototypeOf(ii),
		_iiO = Object.getPrototypeOf(ii),
		console.assert(_iiR === _iiO, {_iiR, _iiO}),
		ii = _iiO,
		oo_next = {__proto__:null},
		oo.__proto__ = oo_next, // note: prototype setter will be skiped because proto is already null from `{__proto__:null}`
		oo = oo_next,
	0)
) {
	
	loop_keys: for (let ii_key of Reflect.ownKeys(ii)) {
		add_key: {
			if (typeof ii_key === 'symbol') {
				ii_key = ii_key.toString(); // avoid "TypeError: can't convert symbol to string"
				break add_key;
			}
			if (typeof i[ii_key] === 'symbol') break add_key;
			try { JSON.stringify(i[ii_key]); } catch (e) { break add_key; }
			oo[ii_key] = i[ii_key];
			continue;
		}
		console.error('skiping key: '+ii_key);
	}
	
}

//try { console.log(JSON.stringify(o)); } catch (e) { console.error(e); }
//console.log(o);
return o;



};

0&& // for testing rm this line
(_=>{
	var E;
	document.addEventListener('click',e=>E=e); document.body.click(); // get 1 event obj
	var obj = mapObjAndProtoToJsonableObj(E);
	var obj_json = JSON.stringify(obj);
	console.log(obj_json);
})();
