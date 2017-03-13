"use strict";

function reverseArray(array) {
	var result = [];
	for (var i = array.length-1; i >= 0; --i) {
		result.push(array[i]);
	}
	
	return result;
}

function reverseArrayInPlace(array) {
	for (var startPoint = 0, endPoint = array.length-1; startPoint < endPoint; ++startPoint, --endPoint) {
		var tempCell = array[startPoint];
		array[startPoint] = array[endPoint];
		array[endPoint] = tempCell;
	}
	return array;
}

console.log(reverseArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));
console.log(reverseArrayInPlace([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));