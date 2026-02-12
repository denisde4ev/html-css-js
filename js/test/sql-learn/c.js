
/* prompt
stop parsting now use ony one if the string exactly matches
and instead of name in the sql, provide it as separate argument,
the first argument is allowed to exactly the expected strings 1 for each C R U D, nothing allowed to change
*/

class SQLParser {
	constructor() {
		this.data = {};
	}

	parse(sqlQuery, name) {
		if (0) {}
		else if (sqlQuery === 'CREATE TABLE users (id int, name varchar(255))')        return this.createTable();
		else if (sqlQuery === 'INSERT INTO users (id,name) VALUES (1,\'John\')')  return this.insert(name);
		else if (sqlQuery === 'SELECT * FROM users WHERE id = 1')                 return this.select(name);
		else if (sqlQuery === 'DELETE FROM users WHERE id = 1')                   return this.delete(name);
		else {}

		throw new Error('Invalid query');
	}

	createTable() {
		if (Object.keys(this.data).length > 0) throw new Error('Table already exists');
		return { success: true };
	}

	insert(name) {
		if (this.data[1]) throw new Error('ID already exists');

		this.data[1] = name;
		return { success: true };
	}

	select(name) {
		if (this.data[1] === name) return [{ id: 1, name: name }];

		return [];
	}

	delete(name) {
		if (this.data[1] !== name) throw new Error('Record not found');

		delete this.data[1];
		return { success: true };
	}
}

// Example usage
const parser = new SQLParser();

// Create table
console.log('Creating table...');
console.log(JSON.stringify(parser.parse('CREATE TABLE users (id int, name varchar(255))', 'John'), null, 2));

console.log('----');
// Insert data
console.log('Inserting data...');
console.log(JSON.stringify(parser.parse('INSERT INTO users (id,name) VALUES (1,\'John\')', 'John'), null, 2));

console.log('----');
// Select data
console.log('Selecting data...');
console.log(JSON.stringify(parser.parse('SELECT * FROM users WHERE id = 1', 'John'), null, 2));

console.log('----');
// Delete data
console.log('Deleting data...');
console.log(JSON.stringify(parser.parse('DELETE FROM users WHERE id = 1', 'John'), null, 2));
