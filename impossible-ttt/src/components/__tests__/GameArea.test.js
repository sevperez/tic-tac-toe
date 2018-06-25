import React from 'react';
import ReactDOM from 'react-dom';
import GameArea from '../GameArea';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameArea />, div);
  ReactDOM.unmountComponentAtNode(div);
});
