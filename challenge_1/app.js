console.log('hello world');
/*
  * MODEL
  * space null if no play yet
*/

// Board Init
const board = (() => {
  let board = [];
  for (let i = 0; i < 3; i++) {
    board.push([null, null, null])
  }
  return board;
})()

const checkRowWin = (row) => {

  if (row[0] !== null) {
    return row[0] === row[1] && row[1] === row[2];
  }
  return false;
}

const checkAllRowsWin = () => {
  let win = false;
  for (let i = 0; i < 3; i++) {
    if (win) {
      break;
    }
    win = checkRowWin(board[i]);
  }
  return win;
}

const checkWin = (board, currentS) => {
  recursion = () => {

  }

  // check if row
  // check if col
  // check if diagonal
}

/*
  * VIEW
  * renders board to the html page
*/


const renderBoard = () => {
  let boardLoc =  document.getElementById("board");
  // empty the current board

  while (boardLoc.children.length > 0) {
    boardLoc.removeChild(boardLoc.children[0])
  }

  // fill board with new rows
  for (let i = 0; i < board.length; i++) {
    let boardRow = document.createElement("div")

    for (let j = 0; j < board[i].length; j++) {
        let boardSpace = document.createElement("inline")
        boardSpace.id = `${i}, ${j}`
        boardSpace.addEventListener('click', (e) => onClick(e, boardSpace))
        let currentVal = document.createTextNode(board[i][j] + ' ')
        boardSpace.appendChild(currentVal)
        boardRow.appendChild(boardSpace);
    }
  document.getElementById("board").appendChild(boardRow);
  }
}



/*
* CONTROLLER
* Changes board state based on click
*/
let playerOneNext = true;

const onClick = (e) => {
  let idArr = e.target.id.split(', ');
  currentPlayer = playerOneNext ? 'X' : 'O';
  console.log(idArr)
  board[idArr[0]][idArr[1]] = `${currentPlayer} `;
  playerOneNext = !playerOneNext;
  renderBoard();
  let test = checkAllRowsWin()
  console.log(test)
}

// board render init
renderBoard();

