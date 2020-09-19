
const BoardModel = {
  playerXNext: true,

  xWins: 0,
  oWins: 0,

  makeBoard: () => {
    let board = [];
    for (let i = 0; i < 3; i++) {
      board.push([null, null, null])
    }
    return board;
  },

  currentBoard: (() => {
    let board = [];
    for (let i = 0; i < 3; i++) {
      board.push([null, null, null])
    }
    return board;
  })(),

  checkRowWin: (row) => {
    if (row[0] !== null) {
      return row[0] === row[1] && row[1] === row[2];
    }
    return false;
  },

  checkAllRowsWin: () => {
    let win = false;
    for (let i = 0; i < 3; i++) {
      if (win) {
        break;
      }
      win = BoardModel.checkRowWin(BoardModel.currentBoard[i]);
    }
    return win;
  },

  checkAllColWins: () => {
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
  },

  checkAllDiagonalWins: () => {
    if (BoardModel.currentBoard[1][1] !== null) {
      return (BoardModel.currentBoard[0][0] === BoardModel.currentBoard[1][1] && BoardModel.currentBoard[1][1] === BoardModel.currentBoard[2][2]) || (BoardModel.currentBoard[0][2] === BoardModel.currentBoard[1][1] && BoardModel.currentBoard[1][1] === BoardModel.currentBoard[2][0])
    }
    return false;
  },

  checkWin: () => {
    return (BoardModel.checkAllColWins() || BoardModel.checkAllRowsWin() || BoardModel.checkAllDiagonalWins())
  }
}


// Board Init

/*
  * VIEW
  * renders board to the html page
*/

const BoardView = {

  renderBoard: () => {
    let boardLoc =  document.getElementById("board");
    // empty the current board
    if (boardLoc === null) {
      boardLoc = document.createElement("div");
      boardLoc.id = "board";
      document.getElementById("win-title").replaceWith(boardLoc);

    }
    while (boardLoc.children.length > 0) {
      boardLoc.removeChild(boardLoc.children[0])
    }

    // fill board with new rows
    for (let i = 0; i < BoardModel.currentBoard.length; i++) {
      let boardRow = document.createElement("div")

      for (let j = 0; j < BoardModel.currentBoard[i].length; j++) {
          let boardSpace = document.createElement("inline")
          boardSpace.id = `${i}, ${j}`

          let currentVal = document.createTextNode(BoardModel.currentBoard[i][j] + ' ')
          boardSpace.appendChild(currentVal)
          boardRow.appendChild(boardSpace);
      }
    document.getElementById("board").appendChild(boardRow);
    }
  },

  renderButton: () => {
    let restart = document.createElement("button");
    restart.innerHTML = "Restart";
    restart.id = 'restart';
    let board = document.getElementById("board");
    document.getElementById("app").insertBefore(restart, board);
  },

  winScoreInit: () => {
    let oTally = document.createElement("div");
    let oNumWins = document.createTextNode(`O has won: ${BoardModel.oWins} times`)
    oTally.appendChild(oNumWins);
    oTally.id = 'oTally';

    let xTally = document.createElement("div");
    let xNumWins = document.createTextNode(`X has won: ${BoardModel.xWins} times`);
    xTally.appendChild(xNumWins);
    xTally.id = 'xTally';

    document.getElementById("app").appendChild(oTally);
    document.getElementById("app").appendChild(xTally);
  },

  renderWinScore: () => {
    let oTally = document.createElement("div");
    let oNumWins = document.createTextNode(`O has won: ${BoardModel.oWins} times`)
    oTally.appendChild(oNumWins);

    let xTally = document.createElement("div");
    let xNumWins = document.createTextNode(`X has won: ${BoardModel.xWins} times`);
    xTally.appendChild(xNumWins);

    document.getElementById("oTally").replaceWith(oTally);
    document.getElementById("xTally").replaceWith(xTally);
    oTally.id = "oTally";
    xTally.id = "xTally";
  },

  appInit: () => {
    BoardView.renderBoard();
    BoardView.renderButton();
    document.getElementById("board").addEventListener('click', (e) => BoardController.onSpaceClick(e))
    document.getElementById("restart").addEventListener('click', (e) => BoardController.onRestartClick(e))
    BoardView.winScoreInit();
    // BoardView.currentBoard();
  }
}


/*
* CONTROLLER
* Changes board state based on click
*/


const BoardController = {
  onSpaceClick: (e) => {
    if (e.target.innerHTML === 'null ') {
      let idArr = e.target.id.split(', ');
      currentPlayer = BoardModel.playerXNext ? 'X' : 'O';

      BoardModel.currentBoard[idArr[0]][idArr[1]] = `${currentPlayer} `;
      BoardView.renderBoard();

      BoardModel.playerXNext = !BoardModel.playerXNext;

      if (BoardModel.checkWin()) {

        if (currentPlayer === 'X') {
          BoardModel.xWins++
          BoardModel.playerXNext = true;
        } else {
          BoardModel.oWins++
          BoardModel.playerXNext = false;
        }

        let winTitle = document.createElement("div")
        let winText = document.createTextNode(`${currentPlayer} Wins!!!`)

        winTitle.appendChild(winText);
        winTitle.id = "win-title";
        document.getElementById("board").replaceWith(winTitle);
        BoardView.renderWinScore();
      }
    }
  },

  onRestartClick: (e) => {
    e.preventDefault()
    BoardModel.currentBoard = BoardModel.makeBoard();
    BoardView.renderBoard();
    document.getElementById("board").addEventListener('click', (e) => BoardController.onSpaceClick(e))
  }
}






// board render init
BoardView.appInit();

