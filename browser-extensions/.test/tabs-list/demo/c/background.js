browser.browserAction.onClicked.addListener(() => {
	browser.tabs.executeScript({
		code: "alert('extension clicked');"
	});
});
