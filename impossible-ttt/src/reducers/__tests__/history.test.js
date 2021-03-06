// TESTS - history.test.js

import deepfreeze from "deepfreeze";

import reducer from "../history";
import { FETCH_HISTORY_SUCCESS,
         GAME_OVER,
         RESET_GAME_HISTORY } from "../../actions/actionTypes";

describe("history reducer", () => {
  it("should return the initial state", () => {
    expect(reducer({}, {})).toEqual({});
  });
  
  it("should return updated state if provided with an action", () => {
    const sampleHistory = {
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
    };
    const stateBefore = {};
    const action = {
      type: FETCH_HISTORY_SUCCESS,
      response: sampleHistory,
    };
    const stateAfter = sampleHistory;
    
    deepfreeze(stateBefore);
    deepfreeze(stateAfter);
    
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
  
  it("should update game history on game over", () => {
    const stateBefore = {
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
      }
    };
    
    const gameData = {
      winner: "computer",
      startDateTime: "2018-06-25T01:16:00.478Z",
      finishDateTime: "2018-06-25T02:16:00.478Z",
      numRounds: 3,
      nextPlayer: "human",
      humanToken: "X",
      computerToken: "O",
      currentBoard: [["O", null, "X"],["O", "X", null],[null, null, "X"]],
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
    
    const sampleId = "SBLKHK";
    
    const stateAfter = {
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
      [sampleId]: {
        winner: "computer",
        startDateTime: "2018-06-25T01:16:00.478Z",
        finishDateTime: "2018-06-25T02:16:00.478Z",
        numRounds: 3,
        nextPlayer: "human",
        humanToken: "X",
        computerToken: "O",
        currentBoard: [["O", null, "X"],["O", "X", null],[null, null, "X"]],
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
      }
    };
    
    const action = {
      type: GAME_OVER,
      data: gameData,
      id: sampleId
    };
    
    deepfreeze(stateBefore);
    deepfreeze(stateAfter);
    
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
  
  it("should reset game history", () => {
    const stateBefore = {
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
      }
    };
    
    const stateAfter = {};
    
    const action = {
      type: RESET_GAME_HISTORY,
    };
    
    deepfreeze(stateBefore);
    deepfreeze(stateAfter);
    
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
