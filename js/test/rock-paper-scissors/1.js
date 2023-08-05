var game1 = [
	{ name: "player1", val: 'rock' },
	{ name: "player2", val: 'scissors' },
	{ name: "player3", val: 'rock' },
	{ name: "player4", val: 'scissors' },
	{ name: "player5", val: 'rock' },
	{ name: "player6", val: 'scissors' },
	{ name: "player7", val: 'rock' },
	{ name: "player8", val: 'scissors' },
	{ name: "player9", val: 'rock' },
	{ name: "player10", val: 'scissors' },




	//{ name: "player13", val: 'paper' },

];

rps_compare = function(a, b) {
	switch (`${a}:${b}`) {
	case 'rock:paper':
	case 'paper:scissors':
	case 'scissors:rock':
		return -1; // reft hand wins
	case 'rock:rock':
	case 'paper:paper':
	case 'scissors:scissors':
		return 0; // no one wins
	case 'rock:scissors':
	case 'paper:rock':
	case 'scissors:paper':
		return 1; // right hand wins
	//default: return unedfined;
	}
}


console.table(game1.sort( (a,b) => rps_compare(a.val, b.val) ))



