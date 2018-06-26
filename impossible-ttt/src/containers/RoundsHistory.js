import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import HistoryItem from "../components/HistoryItem";

const mapStateToProps = (state) => ({
  history: state.currentGame.rounds,
});

export const RoundsHistory = (props) => {
  return (
    <div className="py-4">
      <div className="header">
        <h3>
          <i className="fa fa-history mr-2" aria-hidden="true"></i>
          Round History
        </h3>
      </div>
      <ul className="list-group">
        {props.history.map((round, idx) => (
          <HistoryItem
            key={idx}
            position={idx}
            winner={round.winner}
          />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps)(RoundsHistory);

RoundsHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      board: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.string)
      ),
      winner: PropTypes.string,
    })
  )
};
