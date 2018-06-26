// REDUCERS - currentGame.js

import { FETCH_CURRENT_GAME_SUCCESS,
         START_NEW_GAME,
         REGISTER_MOVE } from "../actions/actionTypes";

const currentGame = (state = null, action) => {
  switch(action.type) {
    case FETCH_CURRENT_GAME_SUCCESS:
      return action.response;
    case START_NEW_GAME:
      return action.data;
    case REGISTER_MOVE:
      const newSquares = state.currentSquares.map(function(row, rowIdx) {
        if (rowIdx === action.data.location[0]) {
          const newRow = row.map(function(square, squareIdx) {
            if (squareIdx === action.data.location[1]) {
              return action.data.token;
            } else {
              return square;
            }
          });
          
          return newRow;
        } else {
          return row;
        }
      });
      
      return {
        ...state,
        nextPlayer: state.nextPlayer === "human" ? "computer" : "human",
        currentSquares: newSquares,
      };
    default:
      return state;
  }
};

export default currentGame;
