import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCurrentGame } from "../actions";
import { registerMove, roundOver, gameOver } from "../actions";
import uuidv4 from "uuid/v4";

import Board from "./Board";

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
  
  boardFull(board) {
    for (let i = 0, len = board.length; i < len; i += 1) {
      const line = board[i];
      
      if (line.indexOf(null) >= 0) {
        return false;
      }
    }
    
    return true;
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
    const winner = this.getWinner(board);
    
    if (winner === testToken) {
      return 10;
    } else if (winner && winner !== testToken) {
      return -10;
    } else if (!winner && this.boardFull(board)) {
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
  
  computerMove() {
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
      console.log(moveData);
      this.props.registerMove(moveData);
    }
  }
  
  render() {
    let squares = [[null, null, null], [null, null, null], [null, null, null]];
    
    if (this.props.currentGame && this.props.currentGame.currentBoard) {
      squares = this.props.currentGame.currentBoard;
    }
    
    return (
      <Board
        squares={squares}
      />
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
