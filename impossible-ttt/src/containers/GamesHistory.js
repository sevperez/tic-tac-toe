import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import HistoryItem from "../components/HistoryItem";

const mapStateToProps = (state) => ({
  history: state.history,
});

export const GamesHistory = (props) => {
  const ids = Object.keys(props.history);
  
  return (
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
        {ids.map((id, idx) => (
          <HistoryItem
            key={id}
            position={idx}
            winner={props.history[id].winner}
            finishDateTime={props.history[id].finishDateTime}
          />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps)(GamesHistory);

GamesHistory.propTypes = {
  history: PropTypes.shape({
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
  })
};
