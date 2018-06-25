import React from "react";

const Board = () => {
  return (
    <div id="board" className="p-4">
      <div className="row">
        <div className="col-4 square">
          <span>X</span>
        </div>
        <div className="col-4 square">
          <span>X</span>
        </div>
        <div className="col-4 square">
          <span>O</span>
        </div>
      </div>
      <div className="row">
        <div className="col-4 square">
          <span>O</span>
        </div>
        <div className="col-4 square">
          <span>X</span>
        </div>
        <div className="col-4 square">
          <span>X</span>
        </div>
      </div>
      <div className="row">
        <div className="col-4 square">
          <span>X</span>
        </div>
        <div className="col-4 square">
          <span>O</span>
        </div>
        <div className="col-4 square">
          <span>O</span>
        </div>
      </div>
    </div>
  );
};

export default Board;
