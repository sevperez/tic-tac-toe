import React from 'react';
import ReactDOM from 'react-dom';
import NewGameForm from '../NewGameForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewGameForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
