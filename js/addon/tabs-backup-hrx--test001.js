if(!window.pre) document.write(`<html><head><style>@media (prefers-color-scheme:dark){*{color-scheme:dark}}*{box-sizing:border-box;}</head></style></head><body style="padding: 0;margin: 0;"><pre id="pre" contenteditable="" style="min-width:100vw; min-height: 98vh;padding: 5em;margin: 0;">pre<br></pre></body></html>`);

pre.innerText=(
(await browser.windows.getAll({ populate: true })).reduce((acc, window1) =>acc+(

`<==1> ${window1.id}. ${window1.title.replaceAll('/','%')}.hrx\n` +
`	<==2> .window-metadata.josn\n`+
`	`+JSON.stringify(window1, (k, v) => k === 'tabs' || k === 'id' || k === 'title' ? void 0 : v)+'\n'+
(
	window1.tabs.reduce((acc, tab1) => acc+(
	((  tab1.discarded && tab1.title && ( tab1.title = tab1.title.replace('💤 ','') )   )),
	((
		tab1pruned = (function(tab1) {

			var ALWAYS_SKIP = [
				'favIconUrl',
				'windowId',
				'id',
				'title',
				'index',
				'url',
				'discarded',
			];
			function checkKey(k, v) { if (!ALWAYS_SKIP.includes(k)) return v; }



			var DEFAULTS = {
				alwaysOnTop: false, // 2
				pinned: false,
				hidden: false,
				attention: false,
				active: false,
				highlighted: false,
				incognito: false, // 2
				status: 'complete',
				audible: false,
				autoDiscardable: true,
				isInReaderMode: false,
				successorTabId: -1,
				cookieStoreId: 'firefox-default',
				width: 0,
				height: 0,

  			type: "normal",
  			// "lastAccessed":true,"sharingState":true // wtf, id the script broke??? // todo better debug
  			focused: false,

  			// todo: "width":1920,"height":1080
			};
			function checkDefault(k, v) { if (DEFAULTS[k] !== v) return v; }

			function checkMutedInfo(k, v) {
				if (!(
					k === 'mutedInfo' &&
					(typeof v === 'object' && v !== null)
				&& true )) return true; // true -> keep. if not as expected, just keep it.

				// prune only with key/default rules so 'muted:false' is dropped
				var pruned = prune(v, [(k, v) =>
					(k === 'muted' && v === false) ? void 0 : v
				]);

				if (!Object.keys(pruned).length) return void 0; // if thats all remove it completely

				return pruned;
			}

			function prune(obj, fns) {
				var out = {};
				keys: for (let k in obj) {
					var v = obj[k];

					fns: for (let fn of fns) {
						v = fn(k, v, out);
						if (v === void 0) continue keys;
						// only when it gets undefined only then stops searching next value
						// and sops calling next fn
					}

					out[k] = v
				}
				return out;
			}



			return prune(tab1, [ checkKey, checkDefault, checkMutedInfo]);

		}(tab1))
	)),

	`	<==2> ${tab1.id}. ${tab1.title&& tab1.title.replaceAll('/','%')}.hrx\n`+
	`		<==3> url.md\n`+
	`		`+(`[${tab1.title&& tab1.title}](${tab1.url.replaceAll(')','%29')})`)+'\n'+

	`		<==3> .tab-metadata\n`+
	`		`+(
		JSON.stringify(tab1pruned)
	)+'\n'+
	//'		<==3> .favIconUrl\n'+
	//'		'+(tab1.favIconUrl)+'\n'+
	//'		<==3>\n'+ // technically needed by the logic, but it looks pretty without it

	'')+'','')
)+
'	<==2>\n'+
'<==1>\n'+

'\n'+

''),'')



);console.clear();
