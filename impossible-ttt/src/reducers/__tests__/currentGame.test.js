// TESTS - currentGame.test.js

import deepfreeze from "deepfreeze";

import reducer from "../currentGame";
import { FETCH_CURRENT_GAME_SUCCESS,
         START_NEW_GAME } from "../../actions/actionTypes";

describe("currentGame reducer", () => {
  it("should return the initial state", () => {
    expect(reducer({}, {})).toEqual({});
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
    
    const stateBefore = {};
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
      rounds: []
    };
    
    const stateBefore = {};
    const action = {
      type: START_NEW_GAME,
      data: newGameData,
    };
    const stateAfter = newGameData;
    
    deepfreeze(stateBefore);
    deepfreeze(stateAfter);
    
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
