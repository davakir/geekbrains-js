window.onload = function() {
	/* first task */
	function min(firstNum, secondNum) {
		return (firstNum < secondNum) ? firstNum : secondNum;
	}
	
	/* second task */
	function countBs(string) {
		var stringToCompare = 'B',
			count = 0;
		
		for (var i = 0; i < string.length; ++i) {
			if (string[i] === stringToCompare) {
				++count;
			}
		}
		
		return count;
	}
	
	function countChar(string, stringToCompare) {
		var count = 0;
		
		for (var i = 0; i < string.length; ++i) {
			if (string[i] === stringToCompare) {
				++count;
			}
		}
		
		return count;
	}
	
	/* task * */
	function isEven(number) {
		if (number > 1) {
			return isEven(number - 2);
		}
		else {
			return !number;
		}
	}
	
	console.log(min(0, -10));
	console.log(countBs('BcBsfsdfBBbcB'));
	console.log(countChar('sdasdBsdBsB', 's'));
	console.log(isEven(75));
};