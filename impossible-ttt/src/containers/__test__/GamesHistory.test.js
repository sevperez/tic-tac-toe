import React from 'react';
import ReactDOM from 'react-dom';
import { GamesHistory } from '../GamesHistory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GamesHistory history={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
