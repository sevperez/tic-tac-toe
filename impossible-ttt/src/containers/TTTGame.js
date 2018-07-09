import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCurrentGame } from "../actions";
import { registerMove, roundOver, gameOver } from "../actions";
import uuidv4 from "uuid/v4";

import Board from "../components/Board";
import ComputerAI from "./ComputerAI";

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

export class TTTGame extends Component {
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
  
  isWinningLine(line) {
    const compareSquare = line[0];
    for (let i = 1, numSquares = line.length; i < numSquares; i += 1) {
      if (line[i] !== compareSquare) {
        return false;
      }
    }
    
    return true;
  }
  
  getWinner(board) {
    for (let i = 0, numLines = winningLines.length; i < numLines; i += 1) {
      const lineState = winningLines[i].map(function(loc) {
        return board[loc[0]][loc[1]];
      });
      
      if (this.isWinningLine(lineState)) {
        return lineState[0];
      }
    }
    
    return null;
  }
  
  handleRound() {
    const roundStatus = this.checkRoundOver(); 
    
    if (roundStatus) {
      this.handleRoundOver(roundStatus);
    }
  }
  
  checkRoundOver() {
    if (!this.props.currentGame) {
      return false;
    }
    
    const currentBoard = this.props.currentGame.currentBoard;
    
    return this.getWinner(currentBoard) || this.boardFull(currentBoard);
  }
  
  handleRoundOver(roundStatus) {
    if (roundStatus === this.props.currentGame.computerToken) {
      const roundData = {
        winner: "computer",
        board: this.props.currentGame.currentBoard,
      };
      this.props.roundOver(roundData);
    } else if (roundStatus === this.props.currentGame.humanToken) {
      const roundData = {
        winner: "human",
        board: this.props.currentGame.currentBoard,
      };
      this.props.roundOver(roundData);
    } else {
      const roundData = {
        winner: "draw",
        board: this.props.currentGame.currentBoard,
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
    const id = uuidv4();
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
  
  boardFull(board) {
    for (let i = 0, len = board.length; i < len; i += 1) {
      const line = board[i];
      
      if (line.indexOf(null) >= 0) {
        return false;
      }
    }
    
    return true;
  }
  
  render() {
    let squares = [[null, null, null], [null, null, null], [null, null, null]];
    
    if (this.props.currentGame && this.props.currentGame.currentBoard) {
      squares = this.props.currentGame.currentBoard;
    }
    
    return (
      <div>
        <ComputerAI
          winningLines={winningLines}
          getWinner={this.getWinner.bind(this)}
          boardFull={this.boardFull.bind(this)}
        />
        <Board
          squares={squares}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchCurrentGame, registerMove, roundOver, gameOver }
)(TTTGame);

TTTGame.propTypes = {
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
  fetchCurrentGame: PropTypes.func,
  registerMove: PropTypes.func,
  roundOver: PropTypes.func,
  gameOver: PropTypes.func,
};
