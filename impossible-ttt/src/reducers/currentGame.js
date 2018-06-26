// REDUCERS - currentGame.js

import { FETCH_CURRENT_GAME_SUCCESS } from "../actions/actionTypes";

const currentGame = (state = {}, action) => {
  switch(action.type) {
    case FETCH_CURRENT_GAME_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export default currentGame;