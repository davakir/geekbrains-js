window.onload = function () {
	var output = '';
	for (var i = 1; i <= 100; i++) {
		var fizzbuzz = false;
		if (!(i % 3)) {
			output += 'fizz';
			fizzbuzz = true;
		}
		if (!(i % 5)) {
			output += 'buzz';
			fizzbuzz = true;
		}
		if (!fizzbuzz) {
			output += i;
		}
		output += ' ';
	}
	
	document.body.innerText = output;
};