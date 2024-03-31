
var person = {
	_m: 100_000,
	get m() { return this._m; },

	play(bet) {
		if (!( typeof bet === 'number' && Number.isFinite(bet) && 0 < bet  )) {
			throw new TypeError('bad bet number');
			//return null;
		}

		if ( !(bet <= this.m) ) {
			return null;
		}

		var win = Math.random()>.5;

		this._m += (win ? 1 : -1 ) * bet;
		return win;
	},
};


module.exports.default = person;
