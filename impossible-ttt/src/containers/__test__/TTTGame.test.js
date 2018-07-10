import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TTTGame } from '../TTTGame';

Enzyme.configure({ adapter: new Adapter() })

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

it("renders without crashing", () => {
  const game = shallow(
    <TTTGame
      squares={[]}
      fetchCurrentGame={() => null}
    />
  );
});

describe("TTTGame methods", () => {
  const game = new TTTGame();
  
  it("isWinningLine returns false for an incomplete line", () => {
    const line = ["X", null, "X"];
    expect(game.isWinningLine(line)).toBe(false);
  });
  
  it("isWinningLine returns false for a non-matching line", () => {
    const line = ["X", "O", "X"];
    expect(game.isWinningLine(line)).toBe(false);
  });
  
  it("isWinningLine returns true for a matching line", () => {
    const line = ["X", "X", "X"];
    expect(game.isWinningLine(line)).toBe(true);
  });
  
  it("getWinner returns null if a board state has no winner", () => {
    const board = [
      ["O", null, "X"],
      ["X", null, "X"],
      ["X", "O", "O"],
    ];
    expect(game.getWinner(board)).toEqual(null);
  });
  
  it("getWinner returns the winning token if a board state has a winner", () => {
    const board = [
      ["O", null, "X"],
      ["X", "O", "X"],
      ["X", "O", "O"],
    ];
    expect(game.getWinner(board)).toEqual("O");
  });
  
  it("boardFull returns false if the board has available spaces", () => {
    const board = [
      ["O", null, "X"],
      ["X", null, "X"],
      ["X", "O", "O"],
    ];
    expect(game.boardFull(board)).toBe(false);
  });
  
  it("boardFull returns true if the board is full", () => {
    const board = [
      ["O", "O", "X"],
      ["X", "X", "O"],
      ["O", "X", "X"],
    ];
    expect(game.boardFull(board)).toBe(true);
  });
  
  it("checkRoundOver returns the winning token if there is one", () => {
    const wonGame = new TTTGame({
      currentGame: {
        winner: null,
        startDateTime: "2018-06-25T01:16:00.478Z",
        finishDateTime: null,
        numRounds: 3,
        nextPlayer: "human",
        humanToken: "X",
        computerToken: "O",
        currentBoard: [
          ["O", null, "X"],
          ["X", "O", "X"],
          [null, "O", "O"],
        ],
        rounds: []
      }
    });
    expect(wonGame.checkRoundOver()).toEqual("O");
  });
  
  it("checkRoundOver returns true if the board is full but no winner", () => {
    const drawGame = new TTTGame({
      currentGame: {
        winner: null,
        startDateTime: "2018-06-25T01:16:00.478Z",
        finishDateTime: null,
        numRounds: 3,
        nextPlayer: "human",
        humanToken: "X",
        computerToken: "O",
        currentBoard: [
          ["O", "O", "X"],
          ["X", "X", "O"],
          ["O", "X", "X"],
        ],
        rounds: []
      }
    });
    expect(drawGame.checkRoundOver()).toEqual(true);
  });
  
  it("checkRoundOver returns false if the round is not complete", () => {
    const ongoingGame = new TTTGame({
      currentGame: {
        winner: null,
        startDateTime: "2018-06-25T01:16:00.478Z",
        finishDateTime: null,
        numRounds: 3,
        nextPlayer: "computer",
        humanToken: "X",
        computerToken: "O",
        currentBoard: [
          ["O", null, "X"],
          ["X", null, "X"],
          [null, "O", "O"],
        ],
        rounds: []
      }
    });
    expect(ongoingGame.checkRoundOver()).toEqual(false);
  });
  
  it("checkGameOver returns true if all rounds have been played", () => {
    const completedGame = new TTTGame({
      currentGame: {
        winner: null,
        startDateTime: "2018-06-25T01:16:00.478Z",
        finishDateTime: null,
        numRounds: 1,
        nextPlayer: "human",
        humanToken: "X",
        computerToken: "O",
        currentBoard: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        rounds: [{
          winner: "computer",
          board: [
            ["O", null, "X"],
            ["X", "O", "X"],
            [null, "O", "O"],
          ]
        }]
      }
    });
    
    expect(completedGame.checkGameOver()).toBe(true);
  });
  
  it("checkGameOver returns false if at least one round remains", () => {
    const completedGame = new TTTGame({
      currentGame: {
        winner: null,
        startDateTime: "2018-06-25T01:16:00.478Z",
        finishDateTime: null,
        numRounds: 1,
        nextPlayer: "human",
        humanToken: "X",
        computerToken: "O",
        currentBoard: [
          ["O", null, "X"],
          ["X", null, "X"],
          [null, "O", "O"],
        ],
        rounds: [],
      }
    });
    
    expect(completedGame.checkGameOver()).toBe(false);
  });
  
  it("getGameWinner returns the correct winner if there is one", () => {
    const computerWonGame = new TTTGame({
      currentGame: {
        winner: null,
        startDateTime: "2018-06-25T01:16:00.478Z",
        finishDateTime: null,
        numRounds: 1,
        nextPlayer: "human",
        humanToken: "X",
        computerToken: "O",
        currentBoard: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        rounds: [{
          winner: "computer",
          board: [
            ["O", null, "X"],
            ["X", "O", "X"],
            [null, "O", "O"],
          ]
        }]
      }
    });
    
    expect(computerWonGame.getGameWinner()).toEqual("computer");
  });
  
  it("getGameWinner returns draw if there is no winner", () => {
    const drawGame = new TTTGame({
      currentGame: {
        winner: null,
        startDateTime: "2018-06-25T01:16:00.478Z",
        finishDateTime: null,
        numRounds: 2,
        nextPlayer: "human",
        humanToken: "X",
        computerToken: "O",
        currentBoard: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        rounds: [{
          winner: "computer",
          board: [
            ["O", null, "X"],
            ["X", "O", "X"],
            [null, "O", "O"],
          ]
        }, {
          winner: "human",
          board: [
            ["O", null, "X"],
            ["X", "X", "X"],
            [null, "O", "O"],
          ]
        }]
      }
    });
    
    expect(drawGame.getGameWinner()).toEqual("draw");
  });
});

