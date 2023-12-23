class SudokuSolver {

  constructor() {
    this.solvedBoards = [];
  }

  validate(puzzleString) {
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  // Sudoku Solver Function - Start
  solve(puzzleString) {
    function sudokuSolver(board) {
      const rows = 9;
      const cols = 9;
      const stack = [];
     
      function findUnassignedLocation(board) {
         for (let i = 0; i < rows; i++) {
           for (let j = 0; j < cols; j++) {
             if (board[i][j] === 0) {
               return [i, j];
             }
           }
         }
         return null;
      }
     
      function isValid(board, num, position) {
         const [row, col] = position;
     
         // Check if 'num' is not already placed in current row / column
         for (let i = 0; i < cols; i++) {
           if (board[row][i] === num || board[i][col] === num) {
             return false;
           }
         }
     
         // Check if 'num' is not placed in current 3x3 box
         const boxRowStart = row - row % 3;
         const boxColStart = col - col % 3;
         for (let i = boxRowStart; i < boxRowStart + 3; i++) {
           for (let j = boxColStart; j < boxColStart + 3; j++) {
             if (board[i][j] === num) {
               return false;
             }
           }
         }
     
         return true;
      }
     
      function solveSudoku(board) {
         const position = findUnassignedLocation(board);
         if (position === null) {
           return true;
         }
     
         const [row, col] = position;
         for (let num = 1; num <= 9; num++) {
           if (isValid(board, num, [row, col])) {
             board[row][col] = num;
             stack.push([board, row, col, num])
             if (solveSudoku(board)) {
               return true;
             }
           }
           board[row][col] = 0;
         }
         return false;
      }
     
      if (solveSudoku(board)) {
         return board;
      } else {
         if (stack.length > 0) {
           const prevState = stack.pop();
           const updatedBoard = prevState[0];
           const prevNum = prevState[3];
           updatedBoard[prevState[1]][prevState[2]] = 0;
           return sudokuSolver(updatedBoard);
         } else {
           return null;
         }
      }
     }
  }
  // Sudoku Solver Function - End

  /* string to 2d array function - Start */

    stringToBoard(sudokuString) {
      const SIZE = 9; // for 9x9 sudoku board
      const board = [];
      
      // split the string into rows for the sudoku board
      for (let row = 0; row < SIZE; row++) {
      const start = row * SIZE;
      const end = start + SIZE;
      board[row] = sudokuString.substring(start, end).split(' ');
      }
      
      this.solve();
      return board;
      }
      
      //examples:
      const sudokuString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      const board = stringToBoard(sudokuString);
      // console.log(board);

  /* string to 2d array function - End */

// Solve Complete Board - Start

  solveCompleteBoard(puzzleString) {
    const board = this.stringToBoard(puzzleString);
    const solvedBoard = this.solveSudoku(board);
    return solvedBoard.flat().join('');
  }
// Solve Complete Board - End

}

module.exports = SudokuSolver;