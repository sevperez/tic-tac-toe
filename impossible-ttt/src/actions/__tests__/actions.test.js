// TESTS - actions.test.js

import * as actions from "../";
import * as types from "../actionTypes";

describe("actions", () => {
  it("should create an action to receive history", () => {
    const response = {
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
    
    const expectedAction = {
      type: types.FETCH_HISTORY_SUCCESS,
      response,
    };
    expect(actions.receiveHistory(response)).toEqual(expectedAction);
  });
  
  it("should create an action to receive current game", () => {
    const response = {
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
    
    const expectedAction = {
      type: types.FETCH_CURRENT_GAME_SUCCESS,
      response,
    };
    expect(actions.receiveCurrentGame(response)).toEqual(expectedAction);
  });
});
