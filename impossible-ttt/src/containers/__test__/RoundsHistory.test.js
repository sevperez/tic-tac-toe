import React from 'react';
import ReactDOM from 'react-dom';
import { RoundsHistory } from '../RoundsHistory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RoundsHistory history={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
