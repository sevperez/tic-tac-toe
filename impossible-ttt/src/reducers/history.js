// REDUCERS - history.js

import { FETCH_HISTORY_SUCCESS,
         GAME_OVER } from "../actions/actionTypes";

const history = (state = {}, action) => {
  switch(action.type) {
    case FETCH_HISTORY_SUCCESS:
      return action.response;
    case GAME_OVER:
      return Object.assign({}, state, { [action.id]: action.data });
    default:
      return state;
  }
};

export default history;
