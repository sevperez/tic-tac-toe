import React from "react";
import PropTypes from "prop-types";
import Square from "../containers/Square";

const Board = (props) => {
  return (
    <div id="board" className="p-4">
      { props.squares.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="row"
        >
          {row.map((square, squareIdx) => (
            <Square
              key={squareIdx}
              location={[rowIdx, squareIdx]}
              token={square}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
