/* Мое решение задачи * из предыдущего урока невозможно переделать на работу с тернарным оператором */

var ChessBoard = {
	generateBoard: function(rows, cols, funcForColor) {
		var html = '<table>';
		for (var i = 0; i < rows; i++) {
			html += '<tr>';
			for (var j = 0; j < cols; j++) {
				if (i === 0 || j === 0) {
					html += '<td class="cell c-'+ i + '-' + j +'" style="width:50px;height:50px;text-align:center;">';
				}
				else {
					html += '<td class="cell c-'+ i + '-' + j +'" style="width:50px;height:50px;background-color:' + funcForColor(i, j) + ';">';
				}
				html += ChessBoard.getBoardTitle(i,j);
				html += ChessBoard.getCellFigure(i,j);
				html += '</td>';
			}
			html += '</tr>';
		}
		html += '</table>';

		return html;
	},

	getBoardTitle: function (row, col) {
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
	},

	getCellFigure: function (row, col) {
		if (row === 0 || col === 0) {
			return '';
		}
		else {
			if (row == 2) return '&#9823;';
			if (row == 7) return '&#9817;';
			if (row == 1 && (col == 1 || col == 8)) return '&#9820;';
			if (row == 8 && (col == 1 || col == 8)) return '&#9814;';
			if (row == 1 && (col == 2 || col == 7)) return '&#9822;';
			if (row == 8 && (col == 2 || col == 7)) return '&#9816;';
			if (row == 1 && (col == 3 || col == 6)) return '&#9821;';
			if (row == 8 && (col == 3 || col == 6)) return '&#9815;';
			if (row == 1 && col == 4) return '&#9819;';
			if (row == 8 && col == 4) return '&#9813;';
			if (row == 1 && col == 5) return '&#9818;';
			if (row == 8 && col == 5) return '&#9812;';
			return '';
		}
	}
};

window.onload = function () {
	document.getElementById('content').innerHTML = ChessBoard.generateBoard(9, 9, function(row, column) {
		var colors = ['white', 'gray', 'white'];

		return colors[(row % 2) + (column % 2)];
	});
};