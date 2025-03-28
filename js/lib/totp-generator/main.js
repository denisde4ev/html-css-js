
// fork of: https://github.com/bellstrand/totp-generator #( https://www.npmjs.com/package/totp-generator )




var totpGenerator = (_=>{
'use strict'
var JsSHA;
try { try { JsSHA = require("jssha") } catch (e) { JsSHA = import('https://cdn.jsdelivr.net/npm/jssha/+esm').then(d=>{JsSHA=d.default}); } // if typeof require === 'function' // in bun has both, but the module can be justnot installed
} catch(e) { eval(syncHTTPGetText('https://cdn.jsdelivr.net/npm/jssha')||'throw 0'); JsSHA = jsSHA;    function syncHTTPGetText(u,x,s){x=new XMLHttpRequest;x.open("GET",u,!1),x.send({});if(s=x.status,0===s||200<=s&&s<300)return x.response};  }
function hex2dec(s) { return parseInt(s, 16); }
function dec2hex(s) { return (s < 15.5 ? "0" : "") + Math.round(s).toString(16); }
function leftpad(str, len, pad) { return str.padStart(len, pad); }

function base32tohex(base32) {
	let base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
	let bits = "";
	let hex = "";

	base32 = base32.replace(/=+$/, "");

	for (let i = 0; i < base32.length; i++) {
		let val = base32chars.indexOf(base32.charAt(i).toUpperCase())
		if (val === -1) throw new Error("Invalid base32 character in key")
		bits += leftpad(val.toString(2), 5, "0")
	}

	for (let i = 0; i + 8 <= bits.length; i += 8) {
		let chunk = bits.substr(i, 8)
		hex = hex + leftpad(parseInt(chunk, 2).toString(16), 2, "0")
	}
	return hex
}

function getToken(key, options) {
	options = options || {};
	options.period    = options.period    || 30;
	options.algorithm = options.algorithm || "SHA-1";
	options.digits    = options.digits    || 6;
	options.timestamp = options.timestamp || Date.now();

	var key = base32tohex(key);
	var epoch = Math.floor(options.timestamp / 1000);
	var time = leftpad(dec2hex(Math.floor(epoch / options.period)), 16, "0");
	var timeleft = 
		(
			options.period * 1000 - (options.timestamp % (options.period * 1000))
		)
	;

	var shaObj = new JsSHA(options.algorithm, "HEX");
	shaObj.setHMACKey(key, "HEX");
	shaObj.update(time);

	var hmac = shaObj.getHMAC("HEX");

	var offset = hex2dec(hmac.substring(hmac.length - 1));

	var otp = (hex2dec(hmac.substr(offset * 2, 8)) & 0x7fffffff) + "";
	otp = otp.substr(Math.max(otp.length - options.digits, 0), options.digits);

	return [otp, timeleft];
};


return getToken;




})();
if (typeof module !== 'undefined') module.exports = totpGenerator;
totpGenerator
