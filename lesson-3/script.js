/* Мое решение задачи * из предыдущего урока невозможно переделать на работу с тернарным оператором */

window.onload = function () {
	var rowsCount = 9,
		triangle = '',
		symbol = '#';
	
	for (var i = 1; i <= rowsCount; ++i) {
		var row = '';
		
		for (var j = 0; j < i; ++j) {
			row += symbol;
		}
		
		triangle += row + '\n';
	}

	alert(triangle);
	
	var size = 8,
		whiteCell = ' ',
		blackCell = '#',
		board = '';
	
	for (var i = 0; i < size; ++i) {
		var row = '';
		for (var j = 0; j < size; ++j) {
			row += (!((i+j)%2)) ? whiteCell : blackCell;
		}
		board += row + '\n';
	}
	
	alert(board);
	
	document.getElementById('content').innerHTML = generateBoard(9, 9, function(row, column) {
		var colors = ['white', 'black', 'white'];
		
		return colors[(row % 2) + (column % 2)];
	});
	
	function generateBoard(rows, cols, func) {
		var html = '<table>';
		for (var i = 0; i < rows; i++) {
			html += '<tr>';
			for (var j = 0; j < cols; j++) {
				if (i === 0 || j === 0) {
					html += '<td class="cell c-'+ i + '-' + j +'" style="width:50px;height:50px;text-align:center;">';
				}
				else {
					html += '<td class="cell c-'+ i + '-' + j +'" style="width:50px;height:50px;background-color:' + func(i, j) + ';">';
				}
				html += getBoardTitle(i,j);
				html += '</td>';
			}
			html += '</tr>';
		}
		html += '</table>';
		
		return html;
	}
	
	function getBoardTitle(row, col) {
		var letters = ['A','B','C','D','E','F','G','H'],
			digits = [1,2,3,4,5,6,7,8];
		
		if (row === 0 && col === 0) {
			return '';
		}
		else if (row === 0) {
			return letters[col-1];
		}
		else if (col === 0) {
			return digits[row-1];
		}
		else return '';
	}
};