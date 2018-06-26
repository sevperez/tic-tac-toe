import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCurrentGame } from "../actions";
import { registerMove } from "../actions";
import sample from "lodash/sample";

import Square from "./Square";

const mapStateToProps = (state) => ({
  currentGame: state.currentGame,
});

export class Board extends Component {
  constructor(props) {
    super(props);
    
    this.computerMove = this.computerMove.bind(this);
  }
  
  componentDidMount() {
    this.fetchData();
  }
  
  componentDidUpdate() {
    if (this.props.currentGame && this.props.currentGame.nextPlayer === "computer") {
      this.computerMove();
    }
  }
  
  fetchData() {
    const { fetchCurrentGame } = this.props;
    fetchCurrentGame();
  }
  
  getUnmarkedSquares() {
    let squares = [[null, null, null], [null, null, null], [null, null, null]];
    
    if (this.props.currentGame && this.props.currentGame.currentSquares) {
      squares = this.props.currentGame.currentSquares;
    }
    
    let unmarkedSquares = [];
    
    squares.forEach(function(row, rowIdx) {
      row.forEach(function(square, squareIdx) {
        if (!this.props.currentGame.currentSquares[rowIdx][squareIdx])
        unmarkedSquares.push([rowIdx, squareIdx]);
      }, this);
    }, this);
    
    return unmarkedSquares;
  }
  
  computerMove() {
    const unmarkedSquares = this.getUnmarkedSquares();
    
    if (unmarkedSquares.length > 0) {
      const move = sample(unmarkedSquares);
      
      const moveData = {
        token: this.props.currentGame.computerToken,
        location: move,
      };
      
      this.props.registerMove(moveData);
    }
  }
  
  render() {
    let squares = [[null, null, null], [null, null, null], [null, null, null]];
    
    if (this.props.currentGame && this.props.currentGame.currentSquares) {
      squares = this.props.currentGame.currentSquares;
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
                location={[rowIdx, squareIdx]}
                token={square}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, { fetchCurrentGame, registerMove })(Board);

Board.propTypes = {
  currentGame: PropTypes.shape({
    winner: PropTypes.string,
    startDateTime: PropTypes.string,
    finishDateTime: PropTypes.string,
    numRounds: PropTypes.number,
    nextPlayer: PropTypes.string,
    humanToken: PropTypes.string,
    computerToken: PropTypes.string,
    currentSquares: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.string)
    ),
    rounds: PropTypes.arrayOf(
      PropTypes.shape({
        board: PropTypes.arrayOf(
          PropTypes.arrayOf(PropTypes.string)
        ),
        winner: PropTypes.string,
      })
    )
  }),
  fetchCurrentGame: PropTypes.func,
  registerMove: PropTypes.func,
};
