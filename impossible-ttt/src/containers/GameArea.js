import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GameInfo from "../components/GameInfo";
import NewGameForm from "./NewGameForm";
import Board from "./Board";

const mapStateToProps = (state) => ({
  currentGame: state.currentGame,
});

export class GameArea extends Component {
  render() {
    return (
      <div id="game-area" className="py-4">
        { !!this.props.currentGame
          ? <GameInfo currentGame={this.props.currentGame} />
          : <NewGameForm />
        }
        <Board />
      </div>
    );
  }
}

export default connect(mapStateToProps)(GameArea);

GameArea.propTypes = {
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
  })
};
