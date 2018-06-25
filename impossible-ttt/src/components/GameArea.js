import React from "react";
import NewGameForm from "./NewGameForm";
import Board from "./Board";

const GameArea = () => {
  return (
    <div id="game-area" className="py-4">
      <NewGameForm />
      <Board />
    </div>
  );
};

export default GameArea;