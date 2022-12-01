
function syncHTTPGet(url) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, false); // false => sync request
	xhr.send({});

	let s = xhr.status;
	xhr._ok = s === 0  || 200 <= s && s < 400;

	return xhr;
}


minify: function syncHTTPGet(u,x,s){x=new XMLHttpRequest;x.open("GET",u,!1),x.send({});s=x.status;x._ok=0===s||200<=s&&s<400;return x}
    function syncHTTPGetText(u,x,s){x=new XMLHttpRequest;x.open("GET",u,!1),x.send({});if(s=x.status,0===s||200<=s&&s<300)return x.response}
