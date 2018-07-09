import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';

import './styles/main.css';
import Root from './components/Root';
import configureStore from "./configureStore";
import { saveState } from "./api";

const store = configureStore();

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
