import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ComputerAI } from '../ComputerAI';
import { TTTGame } from "../TTTGame";

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
  const testGame = {
    winner: null,
    startDateTime: "2018-06-25T01:16:00.478Z",
    finishDateTime: null,
    numRounds: 3,
    nextPlayer: "human",
    humanToken: "X",
    computerToken: "O",
    currentBoard: [[null, null, null],[null, null, null],[null, null, null]],
    rounds: []
  };
  
  const ai = shallow(
    <ComputerAI 
      currentGame={testGame}
      winningLines={winningLines}
      registerMove={() => null}
    />
  );
});

describe("ComputerAI methods", () => {
  const testGame1 = {
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
  };
  
  const testGame2 = {
    winner: null,
    startDateTime: "2018-06-25T01:16:00.478Z",
    finishDateTime: null,
    numRounds: 3,
    nextPlayer: "human",
    humanToken: "X",
    computerToken: "O",
    currentBoard: [
      ["O", null, "X"],
      ["X", null, "X"],
      ["X", "O", "O"],
    ],
    rounds: []
  };
  
  const testGame3 = {
    winner: null,
    startDateTime: "2018-06-25T01:16:00.478Z",
    finishDateTime: null,
    numRounds: 3,
    nextPlayer: "computer",
    humanToken: "X",
    computerToken: "O",
    currentBoard: [
      ["O", "O", "X"],
      ["X", "X", "O"],
      ["O", "X", "X"],
    ],
    rounds: []
  };
  
  const testGame4 = {
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
      ["X", "O", "O"],
    ],
    rounds: []
  };
  
  const game = new TTTGame();
  const ai = new ComputerAI({
    getWinner: game.getWinner.bind(game),
    boardFull: game.boardFull.bind(game),
  });
  
  it("emptySquares identifies and returns empty square locations", () => {
    const expectedResult = [[0, 1], [1, 1], [2, 0]];
    expect(ai.emptySquares(testGame1.currentBoard)).toEqual(expectedResult);
  });
  
  it("emptySquares returns an empty array if no empty square locations", () => {
    const expectedResult = [];
    expect(ai.emptySquares(testGame3.currentBoard)).toEqual(expectedResult);
  });
  
  it("makeMove retuns a new boardState with the provided move filled", () => {
    const expectedResult = [
      ["O", null, "X"],
      ["X", "O", "X"],
      [null, "O", "O"],
    ];
    const move = [1, 1];
    const token = "O";
    expect(ai.makeMove(testGame1.currentBoard, move, token)).toEqual(expectedResult);
  });
  
  it("minimax returns 10 if the testToken is the winner", () => {
    const expectedResult = 10;
    const testToken = testGame1.computerToken;
    const otherToken = testGame1.humanToken;
    const nextToken = testToken;
    
    expect(
      ai.minimax(testGame1.currentBoard, testToken, otherToken, nextToken)
    ).toEqual(expectedResult);
  });
  
  it("minimax returns -10 if the testToken is the loser", () => {
    const expectedResult = -10;
    const testToken = testGame2.computerToken;
    const otherToken = testGame2.humanToken;
    const nextToken = otherToken;
    
    expect(
      ai.minimax(testGame2.currentBoard, testToken, otherToken, nextToken)
    ).toEqual(expectedResult);
  });
  
  it("minimax returns 0 if the board state is a draw", () => {
    const expectedResult = 0;
    const testToken = testGame3.computerToken;
    const otherToken = testGame3.humanToken;
    const nextToken = testToken;
    
    expect(
      ai.minimax(testGame3.currentBoard, testToken, otherToken, nextToken)
    ).toEqual(expectedResult);
  });
  
  it("getTopMoves returns the positions of the top available moves", () => {
    const expectedResult = [[1, 1], [2, 0]];
    const empty = [[0, 1], [1, 1], [2, 0]];
    const minimaxScores = [-10, 10, 10];
    
    expect(ai.getTopMoves(empty, minimaxScores)).toEqual(expectedResult);
  });
  
  it("bestMove returns a random position from the top moves available", () => {
    const testToken = testGame1.computerToken;
    const otherToken = testGame1.humanToken;
    const nextToken = testToken;
    
    expect(
      ai.bestMove(testGame4.currentBoard, testToken, otherToken, nextToken)
    ).toEqual([1, 1]);
  });
});

