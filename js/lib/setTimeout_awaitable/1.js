function setTimeout_awaitable(cb, ms) {
	return new Promise((o, x) => {
		setTimeout(_ => {
			try {
				o(cb());
			} catch (e) {
				x(e);
			}
		}, ms)
	});
};
