// ACTION CREATORS = index.js

import { FETCH_HISTORY_SUCCESS,
         FETCH_CURRENT_GAME_SUCCESS } from "./actionTypes";

export const receiveHistory = (response) => ({
  type: FETCH_HISTORY_SUCCESS,
  response,
});

export const receiveCurrentGame = (response) => ({
  type: FETCH_CURRENT_GAME_SUCCESS,
  response,
});
