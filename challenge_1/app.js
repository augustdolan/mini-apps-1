console.log('hello world');
/*
  * MODEL
  * space null if no play yet
*/

// Board Init
const makeBoard = () => {
  let board = [];
  for (let i = 0; i < 3; i++) {
    board.push([null, null, null])
  }
  return board;
}

let board = makeBoard();

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

const checkAllColWins = () => {
  let win = false;
  for (let i = 0; i < board.length; i++) {
    if (win) {
      break;
    }

    if (board[0][i] !== null) {
      win = (board[0][i] === board[1][i] && board[1][i] === board[2][i])
    }
  }
  return win;
}

const checkAllDiagonalWins = () => {
  if (board[1][1] !== null) {
    return (board[0][0] === board[1][1] && board[1][1] === board[2][2]) || (board[0][2] === board[1][1] && board[1][1] === board[2][0])
  }
  return false;
}



const checkWin = () => {
  return (checkAllColWins() || checkAllRowsWin() || checkAllDiagonalWins())
  }

  // check if row
  // check if col
  // check if diagonal


/*
  * VIEW
  * renders board to the html page
*/

const renderButton = () => {
  let restart = document.createElement("button");
  restart.innerHTML = "Restart";
  restart.addEventListener('click', (e) => onRestartClick(e))
  let board = document.getElementById("board");
  document.getElementById("app").insertBefore(restart, board);
}



const renderBoard = () => {
  let boardLoc =  document.getElementById("board");
  // empty the current board
  if (boardLoc === null) {
    boardLoc = document.createElement("div");
    boardLoc.id = "board";
    document.getElementById("win-title").replaceWith(boardLoc);


  document.getElementById("board").addEventListener('click', (e) => onSpaceClick(e))
  }
  while (boardLoc.children.length > 0) {
    boardLoc.removeChild(boardLoc.children[0])
  }

  // fill board with new rows
  for (let i = 0; i < board.length; i++) {
    let boardRow = document.createElement("div")

    for (let j = 0; j < board[i].length; j++) {
        let boardSpace = document.createElement("inline")
        boardSpace.id = `${i}, ${j}`

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

const onSpaceClick = (e) => {
  if (e.target.innerHTML === 'null ') {
    let idArr = e.target.id.split(', ');
    currentPlayer = playerOneNext ? 'X' : 'O';

    board[idArr[0]][idArr[1]] = `${currentPlayer} `;
    renderBoard();

    if (checkWin()) {
      let winTitle = document.createElement("div")
      let winText = document.createTextNode(`${currentPlayer} Wins!!!`)
      winTitle.appendChild(winText);
      winTitle.id = "win-title";
      document.getElementById("board").replaceWith(winTitle);
    }

    playerOneNext = !playerOneNext;

  }
}

document.getElementById("board").addEventListener('click', (e) => onSpaceClick(e))

const onRestartClick = (e) => {
  e.preventDefault()
  board = makeBoard();
  renderBoard();
}
// board render init
renderButton();
renderBoard();

