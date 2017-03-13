var ChessBoard = {
	rows: null,
	columns: null,
	
	generateBoard: function(rows, cols, funcForColor) {
		this.rows = rows;
		this.columns = cols;
		
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
	},
	
	printSelectedCellInfo: function (row, column) {
		if (row >= this.rows || column >= this.columns) {
			return false;
		}
		var titleRow = document.getElementsByClassName('c-' + row + '-0')[0].innerText,
			titleCol = document.getElementsByClassName('c-0-' + column)[0].innerText;
		
		document.getElementsByTagName('aside')[0].innerText = 'Выбранная ячейка: ' + titleCol + titleRow;
	},
	
	setClickListeners: function () {
		var cells = document.getElementsByClassName('cell');
		
		for (var c = 1; c < cells.length; c++) {
			cells[c].addEventListener('click', function() {
				var className = String((this.classList)[1]).split('-'),
					cellRow = className[1],
					cellCol = className[2];
				
				if (cellCol != 0 && cellRow != 0) {
					ChessBoard.printSelectedCellInfo(cellRow, cellCol);
					
					// Убираем выделение с предыдущей выбранной ячейки
					var selected = document.getElementById('selected-cell');
					if (selected) {
						selected.removeAttribute('id');
						selected.style.border = '2px solid transparent';
					}
					// Выделение выбранной ячейки
					this.style.border = '2px solid cyan';
					this.id = 'selected-cell';
					
					// Если клетка с фигурой, то перемещаем фигуру в соответствующую область
					var isFigure = ChessBoard.checkIsFigure(cellRow);
					if (isFigure) {
						ChessBoard.removeFigure(cellRow, cellCol);
					}
				}
			});
		}
	},
	
	checkIsFigure: function (row) {
		var figureRows = [1, 2, 7, 8];
		return (figureRows.indexOf(+row) != -1);
	},
	
	removeFigure: function (row, col) {
		var whiteFigures = [7,8],
			cell = document.getElementById('selected-cell'),
			cellContent = cell.innerHTML;
		
		cell.innerHTML = '&nbsp;';
		
		var target = (whiteFigures.indexOf(+row) != -1)
			? document.getElementById('removed-white')
			: document.getElementById('removed-black');
		
		var element = document.createElement('div');
		element.setAttribute('data-row', row);
		element.setAttribute('data-col', col);
		element.innerHTML = cellContent;
		element.style.display = 'inline-block';
		element.style.fontSize = 'xx-large';
		element.style.cursor = 'pointer';
		target.appendChild(element);
		RemovedFigure.setListener(element);
	}
};

var RemovedFigure = {
	setListener: function (element) {
		element.addEventListener('click', function () {
			var figure = this.innerText,
				cellToMoveInto = 'c-' + this.getAttribute('data-row') + '-' + this.getAttribute('data-col');
			
			this.parentNode.removeChild(this);
			document.getElementsByClassName(cellToMoveInto)[0].innerText = figure;
		})
	}
};

window.onload = function () {
	document.getElementById('content').innerHTML = ChessBoard.generateBoard(9, 9, function(row, column) {
		var colors = ['white', 'gray', 'white'];

		return colors[(row % 2) + (column % 2)];
	});
	
	ChessBoard.setClickListeners();
	
	document.onkeydown = function (e) {
		var expectedCodes = [37, 38, 39, 40];
		if (expectedCodes.indexOf(e.keyCode) == -1)
			return false;
		
		var currentElement = findCurrentElement(),
			currentElementPosition = getElementPosition(currentElement),
			nextElementPosition,
			moved = false;
		
		if (!currentElement || !currentElementPosition) {
			return false;
		}
		
		if (e.keyCode == 37) {
			// left arrow
			nextElementPosition = currentElementPosition;
			--nextElementPosition.column;
			if (nextElementPosition.column > 0) {
				moveSelectedCell(currentElement, nextElementPosition);
				moved = true;
			}
		}
		else if (e.keyCode == 38) {
			// up arrow
			nextElementPosition = currentElementPosition;
			--nextElementPosition.row;
			if (nextElementPosition.row > 0) {
				moveSelectedCell(currentElement, nextElementPosition);
				moved = true;
			}
		}
		else if (e.keyCode == 39) {
			// right arrow
			nextElementPosition = currentElementPosition;
			++nextElementPosition.column;
			moveSelectedCell(currentElement, nextElementPosition);
			moved = true;
		}
		else if (e.keyCode == 40) {
			// down arrow
			nextElementPosition = currentElementPosition;
			++nextElementPosition.row;
			moveSelectedCell(currentElement, nextElementPosition);
			moved = true;
		}
		
		if (moved) {
			ChessBoard.printSelectedCellInfo(nextElementPosition.row, nextElementPosition.column);
		}
		
		/**
		 * Returns current selected element.
		 * @returns {Element}
		 */
		function findCurrentElement() {
			return document.getElementById('selected-cell');
		}
		
		/**
		 * Returns position of the given element.
		 * @param element
		 * @returns {{row: *, column: *}}
		 */
		function getElementPosition(element) {
			var position = String((element.classList)[1]).split('-'),
				row = position[1],
				col = position[2];
			
			return {row: row, column: col};
		}
		
		function moveSelectedCell(currentElement, nextElementPosition) {
			// выбираем следующую ячейку
			var nextElement = document.getElementsByClassName('c-' + nextElementPosition.row + '-' + nextElementPosition.column)[0];
			
			if (nextElement) {
				// убираем выделение с текущей ячейки
				currentElement.removeAttribute('id');
				currentElement.style.border = 'none';
				// выделяем следующую ячейку
				nextElement.style.border = '2px solid cyan';
				nextElement.id = 'selected-cell';
			}
			else {
				return false;
			}
		}
	};
};