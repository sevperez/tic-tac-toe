import React from "react";
import PropTypes from "prop-types";

const GameInfo = (props) => {
  return (
    <div className="row mx-auto mb-2">
      <div className="col-sm-4">
        <i className="fa fa-arrow-circle-right mr-2" aria-hidden="true"></i>
        <span className="mr-2">Next:</span>
        { props.currentGame.nextPlayer === "human"
          ? <i className="fa fa-user" aria-hidden="true"></i>
          : <i className="fa fa-desktop" aria-hidden="true"></i>
        }
      </div>
      <div className="col-sm-4">
        <i className="fa fa-refresh mr-2" aria-hidden="true"></i>
        <span>Rounds: {props.currentGame.numRounds}</span>
      </div>
      <div className="col-sm-4">
        <i className="fa fa-cog mr-2" aria-hidden="true"></i>
        <span>Token: {props.currentGame.humanToken}</span>
      </div>
    </div>
  );
};

export default GameInfo;

GameInfo.propTypes = {
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
  })
};
