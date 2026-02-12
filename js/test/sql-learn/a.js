

// by ai Phind-70B
/* prompt
give me examples of the most uded CRUD in sql.
cover most used one wike query the entire db,
instert one, delete one, delete all, modify one.
----
now implement simple js that parses this exact syntax.
and saves it to json / javascript object
----
no I meant to store it as json/object after parsing it.
and the printing should be the ojbcets that are returned from select / get
----
can you make it more simple 
like support the minimal.
remove the support for and
remove support for lest then and son on.


the insert should be hardcoded table name
the query one should be only by its id
cols name are only name age and data (data is any string)
also give me hardcoded creating such a table (but support only exact 1 string as passed, else throw error not implemented)

delete should accept only id
update sholud require the intere set of name age and value and only by id



*/

class SQLParser {
	constructor() {
		this.data = {
			users: []
		};
	}

	parse(sqlQuery) {
		sqlQuery = sqlQuery.trim().toLowerCase();
		
		if (sqlQuery.startsWith('create')) {
			return this.createTable(sqlQuery);
		} else if (sqlQuery.startsWith('insert')) {
			return this.insert(sqlQuery);
		} else if (sqlQuery.startsWith('select')) {
			return this.select(sqlQuery);
		} else if (sqlQuery.startsWith('update')) {
			return this.update(sqlQuery);
		} else if (sqlQuery.startsWith('delete')) {
			return this.delete(sqlQuery);
		}
		
		throw new Error('Not implemented');
	}

	createTable(sqlQuery) {
		const match = sqlQuery.match(/create table users \(([\s\S]+)\)/);
		if (!match) throw new Error('Invalid create table syntax');
		
		const columns = match[1].split(',');
		if (columns.length !== 3) throw new Error('Must have exactly 3 columns');
		
		const expected = ['id int', 'name varchar(255)', 'data varchar(255)'];
		if (!columns.every((col, i) => col.trim() === expected[i])) {
			throw new Error('Invalid column definitions');
		}
		
		return { success: true, message: 'Table created' };
	}

	insert(sqlQuery) {
		const match = sqlQuery.match(/insert into users \(id,name,data\) values \((\d+),'([^']+)','([^']+)'\)/);
		if (!match) throw new Error('Invalid insert syntax');
		
		const [_, id, name, data] = match;
		if (!id || !name || !data) throw new Error('All fields are required');
		
		this.data.users.push({ id: parseInt(id), name, data });
		return { success: true, message: 'Record inserted' };
	}

	select(sqlQuery) {
		const match = sqlQuery.match(/select \* from users where id = (\d+)/);
		if (!match) throw new Error('Invalid select syntax');
		
		const [_, id] = match;
		const result = this.data.users.find(user => user.id === parseInt(id));
		return result ? [result] : [];
	}

	update(sqlQuery) {
		const match = sqlQuery.match(/update users set name='([^']+)'.*data='([^']+)'.*where id = (\d+)/);
		if (!match) throw new Error('Invalid update syntax');
		
		const [_, name, data, id] = match;
		if (!name || !data || !id) throw new Error('All fields are required');
		
		const user = this.data.users.find(u => u.id === parseInt(id));
		if (!user) throw new Error('User not found');
		
		user.name = name;
		user.data = data;
		return { success: true, message: 'Record updated' };
	}

	delete(sqlQuery) {
		const match = sqlQuery.match(/delete from users where id = (\d+)/);
		if (!match) throw new Error('Invalid delete syntax');
		
		const [_, id] = match;
		const index = this.data.users.findIndex(u => u.id === parseInt(id));
		if (index === -1) throw new Error('User not found');
		
		this.data.users.splice(index, 1);
		return { success: true, message: 'Record deleted' };
	}
}

// Example usage
const parser = new SQLParser();

// Create table
console.log('Creating table...');
console.log(JSON.stringify(parser.parse('CREATE TABLE users (id int, name varchar(255), data varchar(255))'), null, 2));

console.log('----');
// Insert data
console.log('Inserting data...');
console.log(JSON.stringify(parser.parse("INSERT INTO users (id,name,data) VALUES (1,'John','test data')"), null, 2));

console.log('----');
// Select data
console.log('Selecting data...');
console.log(JSON.stringify(parser.parse('SELECT * FROM users WHERE id = 1'), null, 2));

console.log('----');
// Update data
console.log('Updating data...');
console.log(JSON.stringify(parser.parse("UPDATE users SET name='Jane', data='new data' WHERE id = 1"), null, 2));

console.log('----');
// Delete data
console.log('Deleting data...');
console.log(JSON.stringify(parser.parse('DELETE FROM users WHERE id = 1'), null, 2));
