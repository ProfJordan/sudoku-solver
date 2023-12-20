class SudokuSolver {

  validate(puzzleString) {
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  // string to 2d array

  stringToBoard(sudokuString) {
    const SIZE = 9; // for 9x9 sudoku board
    const board = [];
    
    // split the string into rows for the sudoku board
    for (let row = 0; row < SIZE; row++) {
    const start = row * SIZE;
    const end = start + SIZE;
    board[row] = sudokuString.substring(start, end).split(' ');
    }
    
    return board;
    }
    
    //examples:
    const sudokuString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const board = stringToBoard(sudokuString);
    console.log(board);

solveSudoku(board) {
    const SIZE = 9;
    const BOX_SIZE = 3;
    const EMPTY = ".";

    //add a utility function to check if a number can be placed in a given position
    function canPlace(board, row, col, num) {
      //check row
      for (let i = 0; i < SIZE; i++) {
        if (board[row][i] == num) {
          return false;
        }
      }

      const startRow = row - (row % BOX_SIZE);
      const startCol = col - (col % BOX_SIZE);

      //check column
      // for (let i = 0; i < SIZE; i++) {
      //   if (board[i][col] == num) {
      //     return false;
      //   }
      // }
      
      //check box

      for (let i = 0; i < BOX_SIZE; i++) {
        for (let j = 0; j < BOX_SIZE; j++) {
          if (board[startRow + i][startCol + j] == num) {
            return false;
          }
        }
      }
      return true;
    }

    // add main solver function using backtracking
    function solve() {
      for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
          if (board[row][col] === EMPTY) {
            for (let num = 1; num <= SIZE; num++) {
              if (canPlace(board, row, col, num.toString())) {
                board[row][col] = num.toString();
                if (solve()) {
                  return true;
                } else {
                  board[row][col] = EMPTY;
                }
              }
            }
            return false;
          }
        }
        return true;
    }
    // show example usage
      // const board =[
      // ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
      // ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      // ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      // ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      // ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      // ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      // ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      // ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      // ['.', '.', '.', '.', '8', '.', '.', '7', '9']
      // ];

      solve();
      return board;

      // console.log(solveSudoku(board));
  }
  
  // solve complete sudoku board

  function completeSudoku(puzzleString) {
    const board = this.stringToBoard(puzzleString);
    const solvedBoard = this.solveSudoku(board);
    return solvedBoard.flat().join('');
  }
  
  function stringToBoard(sudokuString) {
    const SIZE = 9; // for 9x9 sudoku board
    const board = [];
    
    // split the string into rows for the sudoku board
    for (let row = 0; row < SIZE; row++) {
    const start = row * SIZE;
    const end = start + SIZE;
    board[row] = sudokuString.substring(start, end).split(' ');
    }
    
    return board;
    }
    
    //examples:
    const sudokuString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const board = stringToBoard(sudokuString);
    console.log(board);
}

module.exports = SudokuSolver;

