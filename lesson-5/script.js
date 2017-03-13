/* First task */
function colorDecimalToHexaDecimal(red, green, blue) {
	var colorHash = [
		decimalToOtherSystem(red, 16),
		decimalToOtherSystem(green, 16),
		decimalToOtherSystem(blue, 16)
	];
	return colorHash.join('');
}

function decimalToOtherSystem(integer, system) {
	var result = [],
		hexaAlphabet = {'10':'A','11':'B','12':'C','13':'D','14':'E','15':'F'};

	/**
	 * Итеративно получаем остатки от делений.
	 */
	do {
		result.push((integer % system));
		integer = Math.floor(integer / system);
	} while (integer >= system);

	/**
	 * Пушим последний остаток, который станет первым знаком в числе.
	 */
	result.push(integer);

	/**
	 * Если перевод в 16-теричную систему, то заменяем нужные цифры на соответствующие буквы.
	 */
	if (system == 16) {
		for (var i = 0; i < result.length; ++i) {
			if (result[i] > 9) result[i] = hexaAlphabet[result[i]];
		}
	}

	/**
	 * Формируем результирующее число.
	 */
	var resultDigit = '';
	for (var num = result.length-1; num >= 0; --num) {
		resultDigit += result[num];
	}

	return resultDigit;
}

console.log(colorDecimalToHexaDecimal(255, 255, 255));
console.log(decimalToOtherSystem(212, 16));

/* Second task */
/**
 * You can only put here digits from 0 to 999 otherwise you'll get empty object.
 */
function digitToObject(digit)
{
	var result = {};

	if (digit > 999) {
		console.log('Your digit is greater than 999');
		return result;
	}

	result.hundrets = Math.floor(digit / 100);
	digit = digit % 100;
	result.decades = Math.floor(digit / 10);
	digit = digit % 10;
	result.units = digit;

	return result;
}

console.log(digitToObject(1000));

/* Third task */
function objectToQueryString(obj)
{
	var queryString = [];
	for (var property in obj) {
		if (obj[property]) {
			queryString.push(property + '=' + obj[property]);
		}
	}

	return queryString.join('&');
}

console.log(objectToQueryString({'name': 'Гоша', 'age': 99}));