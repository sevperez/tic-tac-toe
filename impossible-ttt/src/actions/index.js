// ACTION CREATORS = index.js

import * as api from "../api";

import { FETCH_HISTORY_SUCCESS,
         FETCH_CURRENT_GAME_SUCCESS,
         START_NEW_GAME } from "./actionTypes";

export const receiveHistory = (response) => ({
  type: FETCH_HISTORY_SUCCESS,
  response,
});

export const receiveCurrentGame = (response) => ({
  type: FETCH_CURRENT_GAME_SUCCESS,
  response,
});

export const startNewGame = (data) => ({
  type: START_NEW_GAME,
  data,
});

export const fetchHistory = () => (dispatch) => {
  return api.fetchHistory().then(
    response => {
      dispatch(receiveHistory(response));
    }
  );
};

export const fetchCurrentGame = () => (dispatch) => {
  return api.fetchCurrentGame().then(
    response => {
      dispatch(receiveCurrentGame(response));
    }
  );
};
