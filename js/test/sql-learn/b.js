
/* prompt
{{ a.js prompt }}
---
even more simple than that.
create table make it to check only 1 if case, if exactly matches the expected string (dont even trim the input) just string parses or else throw error.

and now only support id and name (thy will be like key value) name is the value id is the key.
select now to support id or name
delete id or name
----
make it more simple, use substring  - consume the input, and remove from start.
avoid regex, use if else.
*/
class SQLParser {
	constructor() {
		this.data = {};
	}

	parse(sqlQuery) {
		sqlQuery = sqlQuery;
		let pos = 0;
		
		if (this.startsWith(sqlQuery, pos, 'CREATE')) {
			return this.createTable(sqlQuery, pos);
		} else if (this.startsWith(sqlQuery, pos, 'INSERT')) {
			return this.insert(sqlQuery, pos);
		} else if (this.startsWith(sqlQuery, pos, 'SELECT')) {
			return this.select(sqlQuery, pos);
		} else if (this.startsWith(sqlQuery, pos, 'DELETE')) {
			return this.delete(sqlQuery, pos);
		}
		
		throw new Error('Invalid query');
	}

	startsWith(sqlQuery, pos, str) {
		return sqlQuery.substring(pos, pos + str.length) === str;
	}

	consume(sqlQuery, pos, str) {
		if (this.startsWith(sqlQuery, pos, str)) {
			return pos + str.length;
		}
		throw new Error('Expected: ' + str);
	}

	createTable(sqlQuery, pos) {
		pos = this.consume(sqlQuery, pos, 'CREATE TABLE users (id int, name varchar(255))');
		if (pos !== sqlQuery.length) {
			throw new Error('Invalid CREATE TABLE syntax');
		}
		return { success: true };
	}

	insert(sqlQuery, pos) {
		pos = this.consume(sqlQuery, pos, 'INSERT INTO users (id,name) VALUES (');
		let id = '';
		while (sqlQuery[pos] !== ',') {
			id += sqlQuery[pos++];
		}
		pos = this.consume(sqlQuery, pos + 1, '\'');
		let name = '';
		while (sqlQuery[pos] !== '\'') {
			name += sqlQuery[pos++];
		}
		pos = this.consume(sqlQuery, pos + 1, ')');
		if (pos !== sqlQuery.length) {
			throw new Error('Invalid INSERT syntax');
		}
		
		this.data[id] = name;
		return { success: true };
	}

	select(sqlQuery, pos) {
		pos = this.consume(sqlQuery, pos, 'SELECT * FROM users WHERE ');
		let condition = '';
		while (pos < sqlQuery.length) {
			condition += sqlQuery[pos++];
		}
		
		if (condition.startsWith('id = ')) {
			const id = condition.substring(5);
			return this.data[id] ? [{ id, name: this.data[id] }] : [];
		} else if (condition.startsWith('name = ')) {
			const name = condition.substring(7);
			return Object.entries(this.data)
				.filter(([_, value]) => value === name)
				.map(([id, name]) => ({ id, name }));
		}
		throw new Error('Invalid condition');
	}

	delete(sqlQuery, pos) {
		pos = this.consume(sqlQuery, pos, 'DELETE FROM users WHERE ');
		let condition = '';
		while (pos < sqlQuery.length) {
			condition += sqlQuery[pos++];
		}
		
		if (condition.startsWith('id = ')) {
			const id = condition.substring(5);
			if (this.data[id]) {
				delete this.data[id];
				return { success: true };
			}
		} else if (condition.startsWith('name = ')) {
			const name = condition.substring(7);
			const id = Object.entries(this.data)
				.find(([_, value]) => value === name)?.[0];
			if (id) {
				delete this.data[id];
				return { success: true };
			}
		}
		throw new Error('Record not found');
	}
}

// Example usage
const parser = new SQLParser();

// Create table
console.log('Creating table...');
console.log(JSON.stringify(parser.parse('CREATE TABLE users (id int, name varchar(255))'), null, 2));

// Insert data
console.log('\nInserting data...');
console.log(JSON.stringify(parser.parse('INSERT INTO users (id,name) VALUES (1,\'John\')'), null, 2));

// Select by ID
console.log('\nSelecting by ID...');
console.log(JSON.stringify(parser.parse('SELECT * FROM users WHERE id = 1'), null, 2));

// Select by name
console.log('\nSelecting by name...');
console.log(JSON.stringify(parser.parse('SELECT * FROM users WHERE name = \'John\''), null, 2));

// Delete by ID
console.log('\nDeleting by ID...');
console.log(JSON.stringify(parser.parse('DELETE FROM users WHERE id = 1'), null, 2));
