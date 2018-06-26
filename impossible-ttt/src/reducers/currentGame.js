// REDUCERS - currentGame.js

import { FETCH_CURRENT_GAME_SUCCESS,
         START_NEW_GAME } from "../actions/actionTypes";

const currentGame = (state = null, action) => {
  switch(action.type) {
    case FETCH_CURRENT_GAME_SUCCESS:
      return action.response;
    case START_NEW_GAME:
      return action.data;
    default:
      return state;
  }
};

export default currentGame;