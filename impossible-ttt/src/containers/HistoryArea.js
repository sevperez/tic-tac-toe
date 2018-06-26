import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import HistoryItem from "../components/HistoryItem";

const mapStateToProps = (state) => ({
  gameHistory: state.history,
  roundHistory: state.currentGame.rounds,
});

export const HistoryArea = (props) => {
  const gameHistoryIds = Object.keys(props.gameHistory);
  
  return (
    <div id="history">
      <div className="py-4">
        <div className="header">
          <h3>
            <i className="fa fa-history mr-2" aria-hidden="true"></i>
            Round History
          </h3>
        </div>
        <ol className="list-group">
          {props.roundHistory.map((round, idx) => (
            <HistoryItem
              key={idx}
              position={idx}
              winner={round.winner}
            />
          ))}
        </ol>
      </div>
      <div className="py-4">
        <div className="clearfix header">
          <h3 className="d-block float-left">
            <i className="fa fa-history mr-2" aria-hidden="true"></i>
            Game History
          </h3>
          <button
            type="button"
            className="btn btn-sm danger-btn-outline float-right"
            onClick={() => console.log("resetting history!")}
          >
            <i className="fa fa-trash mr-2" aria-hidden="true"></i>
            Reset
          </button>
        </div>
        <ul className="list-group">
          {gameHistoryIds.map((id, idx) => (
            <HistoryItem
              key={id}
              position={idx}
              winner={props.gameHistory[id].winner}
              finishDateTime={props.gameHistory[id].finishDateTime}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(HistoryArea);

HistoryArea.propTypes = {
  gameHistory: PropTypes.shape({
    startDateTime: PropTypes.string,
    finishDateTime: PropTypes.string,
    humanToken: PropTypes.string,
    computerToken: PropTypes.string,
    nextPlayer: PropTypes.string,
    numRounds: PropTypes.number,
    rounds: PropTypes.arrayOf(
      PropTypes.shape({
        board: PropTypes.arrayOf(
          PropTypes.arrayOf(PropTypes.string)
        ),
        winner: PropTypes.string,
      })
    ),
    winner: PropTypes.string,
  }),
  roundHistory: PropTypes.arrayOf(
    PropTypes.shape({
      board: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.string)
      ),
      winner: PropTypes.string,
    })
  ),
};
