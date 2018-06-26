import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';

import './styles/main.css';
import Root from './components/Root';
import configureStore from "./configureStore";
import { loadState, saveState } from "./localStorage";

const currentState = loadState();
const store = configureStore(currentState);

store.subscribe(() => {
  saveState(store.getState());
});

console.log(store.getState());                // TEMP TEMP TEMP

ReactDOM.render(
  <Provider store={store}>
    <Root store={store}/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
