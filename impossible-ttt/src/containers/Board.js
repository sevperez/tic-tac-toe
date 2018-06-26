import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Square from "../components/Square";

const mapStateToProps = (state) => ({
  squares: state.currentGame.currentSquares,
});

export const Board = (props) => {
  const { squares } = props;
  
  return (
    <div id="board" className="p-4">
      { squares.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="row"
        >
          {row.map((square, squareIdx) => (
            <Square
              key={squareIdx}
              token={square}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(Board);

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string)
  )
};
