import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GameInfo from '../GameInfo';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const app = shallow(
    <GameInfo
      currentGame={{nextPlayer: "human", numRounds: 0, humanToken: "X"}}
    />
  );
});
