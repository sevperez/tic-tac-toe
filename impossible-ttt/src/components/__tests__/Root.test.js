import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Root from "../Root";

Enzyme.configure({ adapter: new Adapter() })

it("renders without crashing", () => {
  const root = shallow(<Root />)
});
