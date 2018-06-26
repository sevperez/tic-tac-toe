import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCurrentGame } from "../actions";

import Square from "../components/Square";

const mapStateToProps = (state) => ({
  squares: state.currentGame && state.currentGame.currentSquares,
});

export class Board extends Component {
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    const { fetchCurrentGame } = this.props;
    fetchCurrentGame();
  }
  
  render() {
    let { squares } = this.props;
    
    if (!squares) {
      squares = [[null, null, null], [null, null, null], [null, null, null]];
    }
    
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
  }
}

export default connect(mapStateToProps, { fetchCurrentGame })(Board);

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string)
  ),
  fetchCurrentGame: PropTypes.func,
};
