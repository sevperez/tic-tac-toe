import React from 'react';
import ReactDOM from 'react-dom';
import { NewGameForm } from '../NewGameForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewGameForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("NewGameForm methods", () => {
  it("getComputerToken returns 'O' if playerToken is 'X'", () => {
    var form = new NewGameForm();
    
    expect(form.getComputerToken()).toBe("O");
  });
  
  it("getComputerToken returns 'X' if playerToken is not 'X'", () => {
    var form = new NewGameForm();
    form.state = {
      firstPlayer: "human",
      numRounds: "1",
      playerToken: "O",
    };
    
    expect(form.getComputerToken()).toBe("X");
  });
});
