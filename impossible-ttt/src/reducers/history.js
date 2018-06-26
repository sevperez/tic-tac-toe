// REDUCERS - history.js

import { FETCH_HISTORY_SUCCESS } from "../actions/actionTypes";

const history = (state = {}, action) => {
  switch(action.type) {
    case FETCH_HISTORY_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export default history;
