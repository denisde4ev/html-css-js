
var person = require('./server.js').default;

{
	let bet = 1_000;

	for (let i = 100_000; i--; ) {
		let win = person.play(bet);
		console.log( JSON.stringify({m: person.m, bet, win}) );

		if (win) {

			let next_bet = bet * 1.50;
			if (next_bet < person.m * 0.20)
			bet = next_bet; 
		} else {
			bet = bet * 0.8;
		}
	};

	console.log(person.m);
};
