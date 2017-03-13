"use strict";

function arrayToList(array) {
	/**
	 * Пока не пустой масссив, будем формировать объект типа
	 * {value: val1, rest: {value: val2, rest: {value: val3, rest: null}}}.
	 *
	 * Окончанием списка будет служить пустой массив,
	 * когда придет пустой массив, rest: null и выходим из функции.
	 */
	if (!array.length) {
		return null;
	}
	else {
		return {
			value: array.shift(),
			rest: arrayToList(array)
		};
	}
}

console.log(arrayToList([1,2,3,4,5]));

function listToArray(list) {
	var array = [];
	while (list.rest !== null) {
		array.push(list.value);
		list = list.rest;
	}
	array.push(list.value);
	return array;
}

console.log(listToArray({value: 1, rest: {value: 2, rest: {value: 3, rest: {value: 'blaa', rest: null}}}}));

function List() {
	this.value = null;
	this.rest = null;
	
	this.getList = function() {
		return {
			value: this.value,
			rest: this.rest
		};
	};
	
	this.prepend = function(element) {
		if (this.value === null) {
			this.value = element;
		}
		else {
			this.rest = {
				value: this.value,
				rest: this.rest
			};
			this.value = element;
		}
		
		return this;
	};
	
	this.toArray = function () {
		var array = [],
			list = this;
		while (list.rest !== null) {
			array.push(list.value);
			list = list.rest;
		}
		array.push(list.value);
		return array;
	}
}

var list = new List();
console.log(list.prepend('Scott').prepend('Presley').prepend('Michael').toArray());

function nth (list, position) {
	for (var i = 1; i < position; ++i) {
		if (list.rest === null)
			return undefined;
		list = list.rest;
	}
	
	return list.value;
}

console.log(nth({value: 'bul', rest: {value: 'bol', rest: {value: 'ball', rest: null}}}, 2));

function listToArrayR(list) {
	if (list.next == null) {
		return [list.value];
	}
	
	var arr = listToArrayR(list.next);
	arr.unshift(list.value);
	return arr;
}

console.log(listToArrayR({value: 1, next: {value: 2, next: {value: 3, next: {value: 'blaa', next: null}}}}));
