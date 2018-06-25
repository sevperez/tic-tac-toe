import React from 'react';
import ReactDOM from 'react-dom';
import HistoryArea from '../HistoryArea';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HistoryArea />, div);
  ReactDOM.unmountComponentAtNode(div);
});