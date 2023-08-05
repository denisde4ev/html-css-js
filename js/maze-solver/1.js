var Runner = function(maze) {
	this.maze = maze;

	this.pos = [ null, null ];
	this.spawnBeforeMazeDor(maze.start);
	//}
};
Runner.directions = { // enum
	up: 0,
	right: 1,
	down: 2,
	left: 3
};

Runner.prototype.spawnBeforeMazeDor = function(dorPos) {
	this.maze
	x;
};

Runner.prototype.goNext = function() {
	this
};

Runner.prototype.solve = function() {
	this.mazeEnter();
	while (!this.stuck )
};


var Maze = function(map) {
	this._ = map;
};

Maze.prototype.clone = function() { return this; }
// NOTE:!!! too lazy, pontless to clone for currunt case: 1 maze and 1 time solve

Maze.prototype.solve = function() {
	this.runner = this.runner || new Runner(this.clone());
	return this.runner.solve();
};


function solveMaze(map) {
	var maze = new Maze(map);
	return maze.solve();
}
