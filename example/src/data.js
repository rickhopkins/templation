/** setup data */
let data = {
	count: 2,
	users: [
		{ 'id': 0, 'name': 'John Doe', age: 38, selected: true, test: [1, 2, 3] },
		{ 'id': 1, 'name': 'Jane Doe', age: 38, selected: true, test: [4, 5, 6] },
		{ 'id': 2, 'name': 'Billy Doe', age: 14, selected: true, test: [7, 8, 9] },
		{ 'id': 3, 'name': 'Samantha Doe', age: 12, selected: true, test: [10, 11, 12] },
		{ 'id': 4, 'name': 'Jeremiah Doe', age: 11, selected: true, test: [13, 14, 15] },
		{ 'id': 5, 'name': 'Susie Doe', age: 9, selected: false, test: [16, 17, 18] },
		{ 'id': 6, 'name': 'Ezekiel Doe', age: 7, selected: false, test: [19, 20, 21]},
		{ 'id': 7, 'name': 'Molly Doe', age: 6, selected: true, test: [21, 22, 23] }
	],
	testFunc: function(message) {
		return message;
	},
	testFunc2: function(num) {
		alert(num);
	},
	testFunc3: function(message) {
		alert(message);
	},
	addUser: function(name, age) {
		data.users.push({
			id: data.users.length,
			name: name,
			age: age,
			selected: true,
			test: [1, 2, 3]
		});
	},
	modifyUser: function(user) {
		let newName = prompt('What would you like the new name to be?');
		user.name = newName;
	},
	changeUsers: function() {
		data.users = [{ 'id': 6, 'name': 'Ezekiel Doe', age: 7, selected: false, test: [19, 20, 21]},
		{ 'id': 7, 'name': 'Molly Doe', age: 6, selected: true, test: [21, 22, 23] }];
	},
	toggleVisibility: function(user) {
		user.selected = !user.selected;
	}
};

/** secondary data object */
let user = {
	name: 'Rick Hopkins',
	email: 'rick.hopkins@gmail.com',
	update: function() {
		let newName = prompt('What would you like the new name to be?');
		user.name = newName;
	},
};

export { data, user };