import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ComputerAI } from '../ComputerAI';

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const testGame = {
    winner: null,
    startDateTime: "2018-06-25T01:16:00.478Z",
    finishDateTime: null,
    numRounds: 3,
    nextPlayer: "human",
    humanToken: "X",
    computerToken: "O",
    currentBoard: [[null, null, null],[null, null, null],[null, null, null]],
    rounds: []
  };
  
  const winningLines = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];
  
  const app = shallow(
    <ComputerAI 
      currentGame={testGame}
      winningLines={winningLines}
      registerMove={() => null}
    />
  );
});
