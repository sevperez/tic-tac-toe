// REDUCERS - history.js

import { FETCH_HISTORY_SUCCESS,
         GAME_OVER,
         RESET_GAME_HISTORY } from "../actions/actionTypes";

const history = (state = {}, action) => {
  switch(action.type) {
    case FETCH_HISTORY_SUCCESS:
      return action.response;
    case GAME_OVER:
      return Object.assign({}, state, { [action.id]: action.data });
    case RESET_GAME_HISTORY:
      return {};
    default:
      return state;
  }
};

export default history;
