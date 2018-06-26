import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from '../Board';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Board
      squares={[]}
      fetchCurrentGame={() => null}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
