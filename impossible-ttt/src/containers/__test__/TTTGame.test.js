import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { TTTGame } from '../TTTGame';

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const app = shallow(
    <TTTGame
      squares={[]}
      fetchCurrentGame={() => null}
    />
  );
});
