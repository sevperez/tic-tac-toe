import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import HistoryItem from "../components/HistoryItem";

const mapStateToProps = (state) => ({
  history: state.currentGame && state.currentGame.rounds,
});

export const RoundsHistory = (props) => {
  const { history } = props;
  
  return (
    <div className="py-4">
      <div className="header">
        <h3>
          <i className="fa fa-history mr-2" aria-hidden="true"></i>
          Round History
        </h3>
      </div>
        { !!history 
          ? <ul className="list-group">
              {history.map((round, idx) => (
                <HistoryItem
                  key={idx}
                  position={idx}
                  winner={round.winner}
                />
              ))}
            </ul>
          : <p>No history yet...</p>
        }
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
