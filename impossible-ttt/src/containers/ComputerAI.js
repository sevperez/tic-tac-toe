import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerMove } from "../actions";

const mapStateToProps = (state) => ({
  currentGame: state.currentGame,
});

export class ComputerAI extends Component {
  componentDidMount() {
    if (this.props.currentGame && 
          this.props.currentGame.nextPlayer === "computer") {
      this.move();
    }
  }
  
  componentDidUpdate() {
    if (this.props.currentGame && 
          this.props.currentGame.nextPlayer === "computer") {
      this.move();
    }
  }

  emptySquares(board) {
    let empty = [];
    
    if (!board) {
      return empty;
    }
    
    for (let i = 0, numLines = board.length; i < numLines; i += 1) {
      const line = board[i];
      
      for (let j = 0, numSquares = line.length; j < numSquares; j += 1) {
        if (board[i][j] === null) {
          empty.push([i, j]);
        }
      }
    }
    
    return empty;
  }
  
  makeMove(board, move, token) {
    return board.map(function(line, lineIdx) {
      return line.map(function(square, sqIdx) {
        if (move[0] === lineIdx && move[1] === sqIdx) {
          return token;
        } else {
          return square;
        }
      });
    });
  }
  
  minimax(board, testToken, otherToken, nextToken) {
    // base condition
    const winner = this.props.getWinner(board);
    
    if (winner === testToken) {
      return 10;
    } else if (winner && winner !== testToken) {
      return -10;
    } else if (!winner && this.props.boardFull(board)) {
      return 0;
    }
    
    // recursive condition
    const empty = this.emptySquares(board);
    const nextBoardStates = empty.map(function(move) {
      return this.makeMove(board, move, nextToken);
    }, this);
    
    if (nextToken === testToken) {
      nextToken = otherToken;
    } else {
      nextToken = testToken;
    }
    
    const minimaxScores = nextBoardStates.map(function(boardState) {
      return this.minimax(boardState, testToken, otherToken, nextToken);
    }, this);
    
    const sortedScores = minimaxScores.sort(function(a, b) {
      return a - b;
    });
    
    if (nextToken === otherToken) {
      return sortedScores[sortedScores.length - 1];
    } else {
      return sortedScores[0];
    }
  }
  
  getTopMoves(empty, minimaxScores) {
    let topMoves = [];
    let topScore = -10;
    for (let i = 0, len = minimaxScores.length; i < len; i += 1) {
      const score = minimaxScores[i];
      
      if (score === topScore) {
        topMoves.push(empty[i]);
      } else if (score > topScore) {
        topScore = score;
        topMoves = [empty[i]];
      }
    }
    
    return topMoves;
  }
  
  bestMove(board, testToken, otherToken, nextToken) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  
    const empty = this.emptySquares(board);
    
    const nextBoardStates = empty.map(function(move) {
      return this.makeMove(board, move, nextToken);
    }, this);
    
    if (nextToken === testToken) {
      nextToken = otherToken;
    } else {
      nextToken = testToken;
    }
    
    const minimaxScores = nextBoardStates.map(function(boardState) {
      return this.minimax(boardState, testToken, otherToken, nextToken);
    }, this);
    
    const bestMoves = this.getTopMoves(empty, minimaxScores);
    
    return bestMoves[getRandomInt(bestMoves.length)];
  }
  
  move() {
    const { currentBoard,
            computerToken,
            humanToken, 
            nextPlayer }= this.props.currentGame;
    
    const nextToken = nextPlayer === "computer" ? computerToken : humanToken;
    const empty = this.emptySquares(currentBoard);

    if (empty.length > 0) {
      const move = this.bestMove(currentBoard, computerToken, humanToken, nextToken);
      
      const moveData = {
        token: this.props.currentGame.computerToken,
        location: move,
      };
      this.props.registerMove(moveData);
    }
  }
  
  render() {
    return null;
  }
}

export default connect(
  mapStateToProps,
  { registerMove }
)(ComputerAI);

ComputerAI.propTypes = {
  currentGame: PropTypes.shape({
    winner: PropTypes.string,
    startDateTime: PropTypes.string,
    finishDateTime: PropTypes.string,
    numRounds: PropTypes.number,
    nextPlayer: PropTypes.string,
    humanToken: PropTypes.string,
    computerToken: PropTypes.string,
    currentBoard: PropTypes.arrayOf(
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
  registerMove: PropTypes.func,
  winningLines: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number)
    )
  ),
  boardFull: PropTypes.func,
  getWinner: PropTypes.func,
};
