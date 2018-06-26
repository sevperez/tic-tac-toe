// REDUCERS - root

import { combineReducers } from "redux";
import currentGame from "./currentGame";
import history from "./history";

const rootReducer = combineReducers({
  currentGame,
  history,
});

export default rootReducer;
