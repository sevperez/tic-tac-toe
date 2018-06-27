import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCurrentGame } from "../actions";
import { registerMove, roundOver, gameOver } from "../actions";
import sample from "lodash/sample";
import flatten from "lodash/flatten";
import { v4 } from "node-uuid";

import Square from "./Square";

const mapStateToProps = (state) => ({
  currentGame: state.currentGame,
});

const winningLines = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

export class Board extends Component {
  constructor(props) {
    super(props);
    
    this.computerMove = this.computerMove.bind(this);
  }
  
  componentDidMount() {
    this.fetchData();
  }
  
  componentDidUpdate() {
    const gameStatus = this.checkGameOver();
    
    if (gameStatus) {
      this.handleGameEnd();
    } else {
      this.handleRound();
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
  
  centerAvailable() {
    return this.props.currentGame.currentSquares[1][1] === null;
  }
  
  getAvailableCorners() {
    const squares = this.props.currentGame.currentSquares;
    const corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
    let availableCorners = [];
    
    corners.forEach(function(corner) {
      if (squares[corner[0]][corner[1]] === null) {
        availableCorners.push(corner);
      }
    });
    
    return availableCorners;
  }
  
  findWinningMove(row, token) {
    const squares = this.props.currentGame.currentSquares;

    const square1 = squares[row[0][0]][row[0][1]];
    const square2 = squares[row[1][0]][row[1][1]];
    const square3 = squares[row[2][0]][row[2][1]];
    
    if (square1 === square2 && square3 === null && square1 === token) {
      return [row[2][0], row[2][1]];
    } else if (square1 === square3 && square2 === null && square1 === token) {
      return [row[1][0], row[1][1]];
    } else if (square2 === square3 && square1 === null && square2 === token) {
      return [row[0][0], row[0][1]];
    } else {
      return null;
    }
  }
  
  winningSquare(token) {
    for (let i = 0, len = winningLines.length; i < len; i += 1) {
      const row = winningLines[i];
      const winningMove = this.findWinningMove(row, token);
      
      if (winningMove) {
        return winningMove;
      }
    }
    
    return null;
  }
  
  blockCorner() {
    const { humanToken } = this.props.currentGame;
    const squares = this.props.currentGame.currentSquares;
    
    let edgeBlock;
    if (squares[0][0] === humanToken && squares[0][1] === null) {
      edgeBlock = [0, 1];
    } else if (squares[0][0] === humanToken && squares[1][0] === null) {
      edgeBlock = [1, 0];
    } else if (squares[0][2] === humanToken && squares[0][1] === null) {
      edgeBlock = [0, 1];
    } else if (squares[0][2] === humanToken && squares[1][2] === null) {
      edgeBlock = [1, 2];
    } else if (squares[2][0] === humanToken && squares[2][1] === null) {
      edgeBlock = [2, 1];
    } else if (squares[2][0] === humanToken && squares[1][0] === null) {
      edgeBlock = [1, 0];
    } else if (squares[2][2] === humanToken && squares[2][1] === null) {
      edgeBlock = [2, 1];
    } else if (squares[2][2] === humanToken && squares[1][2] === null) {
      edgeBlock = [1, 2];
    }
    
    return edgeBlock;
  }
  
  computerMove() {
    const unmarkedSquares = this.getUnmarkedSquares();
    console.log(unmarkedSquares);
    if (unmarkedSquares.length > 0) {
      const computerWin = this.winningSquare(this.props.currentGame.computerToken);
      const humanWin = this.winningSquare(this.props.currentGame.humanToken);
      const availableCorners = this.getAvailableCorners();
      const edgeBlock = this.blockCorner();
      
      let move;
      if (computerWin) {
        move = computerWin;
      } else if (humanWin) {
        move = humanWin;
      } else if (this.centerAvailable()) {
        move = [1, 1];
      } else if (edgeBlock) {
        move = edgeBlock;
      } else if (availableCorners.length > 0) {
        move = sample(availableCorners);
      } else {
        move = sample(unmarkedSquares);
      }
      
      const moveData = {
        token: this.props.currentGame.computerToken,
        location: move,
      };
      
      this.props.registerMove(moveData);
    }
  }
  
  checkRowWin(row) {
    const squares = this.props.currentGame.currentSquares;
    
    const square1 = squares[row[0][0]][row[0][1]];
    const square2 = squares[row[1][0]][row[1][1]];
    const square3 = squares[row[2][0]][row[2][1]];
    
    if (square1 != null && square1 === square2 && square2 === square3) {
      return square1;
    }
    
    return null;
  }
  
  findWinner() {
    for (let i = 0, len = winningLines.length; i < len; i += 1) {
      const row = winningLines[i];
      const rowWin = this.checkRowWin(row);
      
      if (rowWin) {
        return rowWin;
      }
    }
    
    return null;
  }
  
  handleRound() {
    const roundStatus = this.checkRoundOver(); 
    
    if (roundStatus) {
      this.handleRoundOver(roundStatus);
    } else {
      if (this.props.currentGame && 
          this.props.currentGame.nextPlayer === "computer") {
        this.computerMove();
      }
    }
  }
  
  checkRoundOver() {
    if (!this.props.currentGame) {
      return false;
    }
    
    const flatSquares = flatten(this.props.currentGame.currentSquares);
    const filledSquares = flatSquares.filter(function(square) {
      return !!square;
    });
    
    return this.findWinner() || filledSquares.length === 9;
  }
  
  handleRoundOver(roundStatus) {
    if (roundStatus === this.props.currentGame.computerToken) {
      const roundData = {
        winner: "computer",
        board: this.props.currentGame.currentSquares,
      };
      this.props.roundOver(roundData);
    } else if (roundStatus === this.props.currentGame.humanToken) {
      const roundData = {
        winner: "human",
        board: this.props.currentGame.currentSquares,
      };
      this.props.roundOver(roundData);
    } else {
      const roundData = {
        winner: "draw",
        board: this.props.currentGame.currentSquares,
      };
      this.props.roundOver(roundData);
    }
  }
  
  checkGameOver() {
    if (!this.props.currentGame) {
      return false;
    }
    
    const { numRounds, rounds } = this.props.currentGame;
    
    return numRounds === rounds.length;
  }
  
  handleGameEnd() {
    const gameWinner = this.getGameWinner();
    const gameData = this.buildGameData(gameWinner);
    const id = v4();
    this.props.gameOver(gameData, id);
  }
  
  getGameWinner() {
    let humanCount = 0;
    let computerCount = 0;
    
    this.props.currentGame.rounds.forEach(function(round) {
      if (round.winner === "computer") {
        computerCount += 1;
      } else if (round.winner === "human") {
        humanCount += 1;
      }
    });
    
    if (humanCount > computerCount) {
      return "human";
    } else if (computerCount > humanCount) {
      return "computer";
    } else {
      return "draw";
    }
  }
  
  buildGameData(gameWinner) {
    const gameData = {
      ...this.props.currentGame,
      winner: gameWinner,
      finishDateTime: new Date().toISOString(),
    };
    
    return gameData;
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

export default connect(
  mapStateToProps,
  { fetchCurrentGame, registerMove, roundOver, gameOver }
)(Board);

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
  roundOver: PropTypes.func,
  gameOver: PropTypes.func,
};
