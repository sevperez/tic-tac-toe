import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Square } from '../Square';

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const square = shallow(<Square />);
});

describe("Square methods", () => {
  it("getCurrentToken returns the humanToken if next player is human", () => {
    var sq = new Square({
      nextPlayer: "human",
      humanToken: "X",
      computerToken: "O",
    });
    
    expect(sq.getCurrentToken()).toEqual("X");
  });
  
  it("getCurrentToken returns the computerToken if next player is computer", () => {
    var sq = new Square({
      nextPlayer: "computer",
      humanToken: "X",
      computerToken: "O",
    });
    
    expect(sq.getCurrentToken()).toEqual("O");
  });
});
