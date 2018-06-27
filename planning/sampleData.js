const sampleData = {
  currentGame: {
    winner: null,
    startDateTime: "2018-06-25T01:16:00.478Z",
    finishDateTime: null,
    numRounds: 3,
    nextPlayer: "human",
    humanToken: "X",
    computerToken: "O",
    currentSquares: [["X", "O", "X"],[null, "O", null],[null, null, null]],
    rounds: [
      {
        winner: "computer",
        board: [["O", null, "X"],["O", "X", null],["O", null, "X"]]
      }, {
        winner: "computer",
        board: [["X", "O", "X"],[null, "O", null],[null, "O", "X"]]
      }
    ]
  },
  history: {
    sampleGame1: {
      winner: "computer",
      startDateTime: "2018-06-25T01:16:00.478Z",
      finishDateTime: "2018-06-25T09:26:00.478Z",
      numRounds: 3,
      nextPlayer: "human",
      humanToken: "X",
      computerToken: "O",
      rounds: [
        {
          winner: "computer",
          board: [["O", null, "X"],["O", "X", null],["O", null, "X"]]
        }, {
          winner: "computer",
          board: [["X", "O", "X"],[null, "O", null],[null, "O", "X"]]
        }, {
          winner: "draw",
          board: [["O", "O", "X"],["X", "X", "O"],["O", "X", "X"]]
        }
      ]
    },
    sampleGame2: {
      winner: "draw",
      startDateTime: "2018-06-25T11:36:00.478Z",
      finishDateTime: "2018-06-25T11:46:00.478Z",
      numRounds: 1,
      nextPlayer: "human",
      humanToken: "X",
      computerToken: "O",
      rounds: [
        {
          "winner": "draw",
          "board": [["O", "X", "O"],["O", "X", "X"],["X", "O", "X"]]
        }
      ]
    }
  }
};