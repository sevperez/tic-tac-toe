import React, { Component } from 'react';
import GameArea from "./GameArea";
import HistoryArea from "../containers/HistoryArea";

export class App extends Component {
  render() {
    return (
      <div className="container py-4">
        <GameArea />
        <HistoryArea />
      </div>
    );
  }
}

export default App;
