console.log('hello world');
/*
  * MODEL
  * space null if no play yet
*/

const board = (() => {
  let board = [];
  for (let i = 0; i < 3; i++) {
    board.push([null, null, null])
  }
  return board;
})()

/*
  * VIEW
  * renders board to the html page
*/
for (let i = 0; i < board.length; i++) {
  let boardSpace = document.createElement("div")
  let testContent = document.createTextNode(board[i][0], board[i][1], board[i][2])
  boardSpace.appendChild(testContent);
  let testAppend = document.getElementById("board");
  testAppend.appendChild(boardSpace);

}
