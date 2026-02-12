
// new URLSearchParams(window.location.search) .get("popup") === "false"

function escapeHtml(str) {
	//RegExp.escape(rep)
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;") // fix'"
	;
}


document.head.insertAdjacentHTML(
	'beforeend'
	,
	'<meta name="context" content="&amp;'
	+
	escapeHtml(location.search.replace(/^\?/,''))
	+
	'&amp;">'
);


document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("alertTab").addEventListener("click", () => {
		browser.tabs.executeScript({
			code: "alert('extension clicked');"
		});
	});
	document.getElementById("alertPopup").addEventListener("click", () => {
		alert('123');
	});
	document.getElementById("click-log").addEventListener("click", () => {
		console.log(123)
	});

	document.getElementById("click-open-tab").addEventListener("click", () => {
		//browser.runtime.openOptionsPage()
		//browser.tabs.create({ url: browser.runtime.getURL("options.html") });
		//browser.tabs.create({ url: browser.runtime.getURL("popup.html") });
		//browser.tabs.create({ url: location.href +'?popup=false' });
		browser.tabs.create({ url: browser.runtime.getURL("popup.html") +'?popup=false' });
	});
});

