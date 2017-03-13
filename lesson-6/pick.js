"use strict";

function pick(obj, keys) {
	var result = {};
	for (var param in obj) {
		if (keys.indexOf(param) != -1) {
			result[param] = obj[param];
		}
	}
	return result;
}

console.log(pick({
	name: 'Nick',
	surname: 'Parse',
	age: 27,
	email: 'n.parse@hotmail.com',
	country: 'Macedonia',
	student: true
}, ['name', 'country', 'student', 'car']));