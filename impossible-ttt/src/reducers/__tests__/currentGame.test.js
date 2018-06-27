// TESTS - currentGame.test.js

import deepfreeze from "deepfreeze";

import reducer from "../currentGame";
import { FETCH_CURRENT_GAME_SUCCESS,
         START_NEW_GAME,
         REGISTER_MOVE,
         ROUND_OVER,
         GAME_OVER } from "../../actions/actionTypes";

describe("currentGame reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(null, {})).toEqual(null);
  });
  
  it("should return updated state if provided with an action", () => {
    const sampleCurrentGame = {
      winner: null,
      startDateTime: "2018-06-25T01:16:00.478Z",
      finishDateTime: null,
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
          winner: null,
          board: [[null, null, null],[null, null, null],[null, null, null]]
        }
      ]
    };
    
    const stateBefore = null;
    const action = {
      type: FETCH_CURRENT_GAME_SUCCESS,
      response: sampleCurrentGame,
    };
    const stateAfter = sampleCurrentGame;
    
    deepfreeze(stateBefore);
    deepfreeze(stateAfter);
    
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
  
  it("should start a new game with the provided data", () => {
    const newGameData = {
      winner: null,
      startDateTime: "2018-06-25T01:16:00.478Z",
      finishDateTime: null,
      numRounds: 3,
      nextPlayer: "human",
      humanToken: "X",
      computerToken: "O",
      currentSquares: [[null, null, null],[null, null, null],[null, null, null]],
      rounds: []
    };
    
    const stateBefore = null;
    const action = {
      type: START_NEW_GAME,
      data: newGameData,
    };
    const stateAfter = newGameData;
    
    deepfreeze(stateBefore);
    deepfreeze(stateAfter);
    
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
  
  it("should register a new move with provided data", () => {
    const moveData = {
      token: "X",
      location: [2, 2],
    };
    
    const stateBefore = {
      winner: null,
      startDateTime: "2018-06-25T01:16:00.478Z",
      finishDateTime: null,
      numRounds: 3,
      nextPlayer: "human",
      humanToken: "X",
      computerToken: "O",
      currentSquares: [[null, null, null],[null, null, null],[null, null, null]],
      rounds: []
    };
    
    const action = {
      type: REGISTER_MOVE,
      data: moveData,
    };
    
    const stateAfter = {
      winner: null,
      startDateTime: "2018-06-25T01:16:00.478Z",
      finishDateTime: null,
      numRounds: 3,
      nextPlayer: "computer",
      humanToken: "X",
      computerToken: "O",
      currentSquares: [[null, null, null],[null, null, null],[null, null, "X"]],
      rounds: []
    };
    
    deepfreeze(stateBefore);
    deepfreeze(stateAfter);
    
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
  
  it("should update round history when a round ends", () => {
    const stateBefore = {
      winner: null,
      startDateTime: "2018-06-25T01:16:00.478Z",
      finishDateTime: null,
      numRounds: 3,
      nextPlayer: "human",
      humanToken: "X",
      computerToken: "O",
      currentSquares: [["O", null, "X"],["O", "X", null],[null, null, "X"]],
      rounds: []
    };
    
    const roundData = {
      winner: "computer",
      board: [["O", null, "X"],["O", "X", null],["O", null, "X"]]
    };
    
    const action = {
      type: ROUND_OVER,
      data: roundData,
    };
    
    const stateAfter = {
      winner: null,
      startDateTime: "2018-06-25T01:16:00.478Z",
      finishDateTime: null,
      numRounds: 3,
      nextPlayer: "computer",
      humanToken: "X",
      computerToken: "O",
      currentSquares: [[null, null, null],[null, null, null],[null, null, null]],
      rounds: [
        {
          winner: "computer",
          board: [["O", null, "X"],["O", "X", null],["O", null, "X"]]
        }
      ]
    };
    
    deepfreeze(stateBefore);
    deepfreeze(stateAfter);
    
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
  
  it("should reset board on game over", () => {
    const stateBefore = {
      winner: null,
      startDateTime: "2018-06-25T01:16:00.478Z",
      finishDateTime: null,
      numRounds: 3,
      nextPlayer: "human",
      humanToken: "X",
      computerToken: "O",
      currentSquares: [["X", "O", null],[null, "O", "X"],[null, "O", null]],
      rounds: [
        {
          winner: "computer",
          board: [["O", null, "X"],["O", "X", null],["O", null, "X"]]
        }, {
          winner: "computer",
          board: [["X", "O", "X"],[null, "O", null],[null, "O", "X"]]
        }
      ]
    };
    
    const gameData = {
      winner: "computer",
      startDateTime: "2018-06-25T01:16:00.478Z",
      finishDateTime: "2018-06-25T02:16:00.478Z",
      numRounds: 3,
      nextPlayer: "human",
      humanToken: "X",
      computerToken: "O",
      currentSquares: [["O", null, "X"],["O", "X", null],[null, null, "X"]],
      rounds: [
        {
          winner: "computer",
          board: [["O", null, "X"],["O", "X", null],["O", null, "X"]]
        }, {
          winner: "computer",
          board: [["X", "O", "X"],[null, "O", null],[null, "O", "X"]]
        }, {
          winner: "computer",
          board: [["X", "O", null],[null, "O", "X"],[null, "O", null]]
        }
      ]
    };
    
    const stateAfter = null;
    
    const action = {
      type: GAME_OVER,
      data: gameData,
      id: "sample",
    };
    
    deepfreeze(stateBefore);
    deepfreeze(stateAfter);
    
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
