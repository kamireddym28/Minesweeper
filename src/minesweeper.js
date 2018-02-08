class Game{
	constructor(numberOfRows, numberOfColumns, numberOfBombs){
	this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
	}
	playMove(rowIndex, columnIndex) {
		this._board.flipTile(rowIndex, columnIndex);

		if (this._board.playerBoard[rowIndex][columnIndex] ==='B'){
			console.log ('Game is over, Final Board: ');
			this._board.print();
		} else if(!this._board.hasSafeTiles()){
			console.log ('Congratulations!! You won');
		}
		else{
			console.log ('Current Board: ');
			this._board.print();
		}
	}

}

class Board{
	constructor(numberOfRows, numberOfColumns, numberOfBombs){
	this._numberOfBombs = numberOfBombs;
	this._numberOfTiles = numberOfRows * numberOfColumns;
	this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
	this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	get playerBoard(){
		return this._playerBoard;
	}

	flipTile (rowIndex, columnIndex){
		if (this._playerBoard[rowIndex][columnIndex] !== ' '){
			console.log('This tile has already been flipped!');
		return;
	}
	else if(this._bombBoard[rowIndex][columnIndex] === 'B'){
		this._playerBoard[rowIndex][columnIndex] = 'B';
	}else{
		this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs (rowIndex, columnIndex);
	}
		this._numberOfTiles--;
	}

	getNumberOfNeighborBombs(rowIndex, columnIndex){
	let neighborOffsets = [ [-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1] ];
	let numberOfRows = this._bombBoard.length;
	let numberOfColumns = this._bombBoard[0].length;
	let numberOfBombs = 0;
	neighborOffsets.forEach (offset => {
		let neighborRowIndex = rowIndex + offset[0];
		let neighborColumnIndex = columnIndex + offset[1];

	if ((neighborRowIndex >= 0)&&(neighborRowIndex < numberOfRows)
		&&(neighborColumnIndex >= 0)&&(neighborColumnIndex < numberOfColumns)){
			if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
					numberOfBombs++;
			}
	}
	});
		return numberOfBombs;

	}
	hasSafeTiles() {
		return this._numberOfTiles !== this._numberOfBombs;
	}

	print() {
		 /*console.log(board[0].join(' | '));
		 console.log(board[1].join(' | '));
		 console.log(board[2].join(' | '));*/
		 console.log(this._playerBoard.map(row =>row.join(' | ')).join(' \n'));
	 }

	static generatePlayerBoard(numberOfRows, numberOfColumns){
	let board = [];
	for (let i = 0; i< numberOfRows; i++){
		let row = [];
		for(let j = 0; j< numberOfColumns; j++){
			row.push(' ');
		}
		board.push(row);
	}
	return board;
}

	static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs){
	let board = [];
	for (let i = 0; i< numberOfRows; i++){
		let row = [];
		for(let j = 0; j< numberOfColumns; j++){
			row.push(null);
		}
		board.push(row);
	}
	let numberOfBombsPlaced=0;
	while (numberOfBombsPlaced < numberOfBombs){
		let randomRowIndex = Math.floor(Math.random()* numberOfRows);
		let randomColumnIndex = Math.floor(Math.random()* numberOfColumns);
		if (board [randomRowIndex][randomColumnIndex] !== 'B')
		{
		board [randomRowIndex][randomColumnIndex]= 'B';
		}
		/*else{
		board [randomRowIndex][randomColumnIndex]= '  ';
		}*/
		numberOfBombsPlaced++;
	};
	return board;
}


}

const g = new Game (4,4,2);
g.playMove(3,2);





/*let getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
	let neighborOffsets = [ [-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1] ];
	let numberOfRows = bombBoard.length;
	let numberOfColumns = bombBoard[0].length;
	let numberOfBombs = 0;
	neighborOffsets.forEach (offset => {
		let neighborRowIndex = rowIndex + offset[0];
		let neighborColumnIndex = columnIndex + offset[1];

	if ((neighborRowIndex >= 0)&&(neighborRowIndex < numberOfRows)
		&&(neighborColumnIndex >= 0)&&(neighborColumnIndex < numberOfColumns)){
			if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
					numberOfBombs++;
			}
	}
	});
	return numberOfBombs;
};*/

/*let flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
	if (playerBoard[rowIndex][columnIndex] !== ' '){
		console.log('This tile has already been flipped!');
		return;
	}
	else if(bombBoard[rowIndex][columnIndex] === 'B'){
		playerBoard[rowIndex][columnIndex] = 'B';
	}else{
		playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs (bombBoard, rowIndex, columnIndex);
	}
};*/

/*let printBoard = board => {	console.log(board[0].join(' | '));
							console.log(board[1].join(' | '));
							console.log(board[2].join(' | '));

		console.log(board.map(row =>row.join(' | ')).join(' \n'));
						   };

let playerBoard = generatePlayerBoard (3,3);
let bombBoard = generateBombBoard(3,3,4);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile (playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);


/*const board =   [['  ', '  ', '  '],
				 ['  ', '  ', '  '],
			     ['  ', '  ', '  ']];
//console.log (board);

const printBoard = board => {console.log('Current Board: ');
							 console.log(board[0].join(' | '));
							 console.log(board[1].join(' | '));
							 console.log(board[2].join(' | '));
							 };
console.log (printBoard(board));
board[0][1] = ' 1';
board[2][2] = ' B';
console.log (printBoard(board));*/

/*let blankLine='  |   |  ';
console.log('This is what an empty board would look like:');
console.log(blankLine);
console.log(blankLine);
console.log(blankLine);
let guessLine='1 |   |  ';
let bombLine='  | B |  ';
console.log('This is what a board with a guess and a bomb on it would look like:');
console.log(guessLine);
console.log(bombLine);
console.log(blankLine);*/
