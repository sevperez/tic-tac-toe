// minimaxTTT.js

const compToken = "X";
const humToken = "O";

const winningLines = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

const board1 = [
  ["O", null, "X"],
  ["X", null, "X"],
  [null, "O", "O"],
];

const board2 = [
  ["O", "X", "X"],
  ["X", null, "X"],
  [null, "O", "O"],
];

const board3 = [
  ["O", null, "X"],
  ["X", "X", "X"],
  [null, "O", "O"],
];

const board4 = [
  ["O", null, "X"],
  ["X", null, "X"],
  ["X", "O", "O"],
];

const board5 = [
  ["O", "O", "X"],
  ["X", null, "X"],
  ["X", "O", "O"],
];

const board6 = [
  ["O", null, "X"],
  ["X", "O", "X"],
  ["X", "O", "O"],
];

const board7 = [
  ["O", "O", "X"],
  ["X", "X", "O"],
  ["O", "X", "X"],
];

const board8 = [
  [null, "O", null],
  [null, "X", null],
  [null, null, null],
];

function isWinningLine(line) {
  const compareSquare = line[0];
  for (let i = 1, numSquares = line.length; i < numSquares; i += 1) {
    if (line[i] !== compareSquare) {
      return false;
    }
  }
  
  return true;
}

function getWinner(board) {
  for (let i = 0, numLines = winningLines.length; i < numLines; i += 1) {
    const lineState = winningLines[i].map(function(loc) {
      return board[loc[0]][loc[1]];
    });
    
    if (isWinningLine(lineState)) {
      return lineState[0];
    }
  }
  
  return null;
}

function emptySquares(board) {
  let empty = [];
  
  for (let i = 0, numLines = board.length; i < numLines; i += 1) {
    const line = board[i];
    
    for (let j = 0, numSquares = line.length; j < numSquares; j += 1) {
      if (board[i][j] === null) {
        empty.push([i, j]);
      }
    }
  }
  
  return empty;
}

function boardFull(board) {
  for (let i = 0, len = board.length; i < len; i += 1) {
    const line = board[i];
    
    if (line.indexOf(null) >= 0) {
      return false;
    }
  }
  
  return true;
}

function makeMove(board, move, token) {
  return board.map(function(line, lineIdx) {
    return line.map(function(square, sqIdx) {
      if (move[0] === lineIdx && move[1] === sqIdx) {
        return token;
      } else {
        return square;
      }
    });
  });
}

function minimax(board, testToken, otherToken, nextToken) {
  // base condition
  const winner = getWinner(board);
  
  if (winner === testToken) {
    return 10;
  } else if (winner && winner !== testToken) {
    return -10;
  } else if (!winner && boardFull(board)) {
    return 0;
  }
  
  // recursive condition
  const empty = emptySquares(board);
  const nextBoardStates = empty.map(function(move) {
    return makeMove(board, move, nextToken);
  });
  
  if (nextToken === testToken) {
    nextToken = otherToken;
  } else {
    nextToken = testToken;
  }
  
  const minimaxScores = nextBoardStates.map(function(boardState) {
    return minimax(boardState, testToken, otherToken, nextToken);
  });
  
  const sortedScores = minimaxScores.sort(function(a, b) {
    return a - b;
  });
  
  if (nextToken === otherToken) {
    return sortedScores[sortedScores.length - 1];
  } else {
    return sortedScores[0];
  }
}

function getTopMoves(empty, minimaxScores) {
  let topMoves = [];
  let topScore = -10;
  for (let i = 0, len = minimaxScores.length; i < len; i += 1) {
    const score = minimaxScores[i];
    
    if (score === topScore) {
      topMoves.push(empty[i]);
    } else if (score > topScore) {
      topScore = score;
      topMoves = [empty[i]];
    }
  }
  
  return topMoves;
}

function bestMove(board, testToken, otherToken, nextToken) {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const empty = emptySquares(board);
  
  const nextBoardStates = empty.map(function(move) {
    return makeMove(board, move, nextToken);
  });
  
  if (nextToken === testToken) {
    nextToken = otherToken;
  } else {
    nextToken = testToken;
  }
  
  const minimaxScores = nextBoardStates.map(function(boardState) {
    return minimax(boardState, testToken, otherToken, nextToken);
  });
  
  const bestMoves = getTopMoves(empty, minimaxScores);
  
  return bestMoves[getRandomInt(bestMoves.length)];
}

// console.log("----- emptySquares -----");
// console.log("board1 empty: ", emptySquares(board1));  // [[0, 1], [1, 1], [2, 0]];
// console.log("board7 empty: ", emptySquares(board7));  // [];

// console.log("----- boardFull -----");
// console.log("board1 full: ", boardFull(board1));      // false
// console.log("board7 full: ", boardFull(board7));      // true

// console.log("----- winner -----");
// console.log("board1 winner: ", getWinner(board1));    // null
// console.log("board3 winner: ", getWinner(board3));    // "X"
// console.log("board6 winner: ", getWinner(board6));    // "O"
// console.log("board7 winner: ", getWinner(board7));    // null

console.log("----- minimax -----");
console.log("board1 minimax: ", minimax(board1, compToken, humToken, compToken));  // 10
console.log("board3 minimax: ", minimax(board3, compToken, humToken, humToken));  // 10
console.log("board5 minimax: ", minimax(board5, compToken, humToken, compToken));  // 10
console.log("board2 minimax: ", minimax(board2, compToken, humToken, humToken));  // -10
console.log("board4 minimax: ", minimax(board4, compToken, humToken, humToken));  // -10
console.log("board6 minimax: ", minimax(board6, compToken, humToken, compToken));  // -10
console.log("board7 minimax: ", minimax(board7, compToken, humToken, humToken));  // 0

console.log("----- bestMove -----");
console.log("board1 bestMove: ", bestMove(board1, compToken, humToken, compToken)); // [1, 1]
console.log("board8 bestMove: ", bestMove(board8, compToken, humToken, compToken));

