import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchHistory, resetGameHistory } from "../actions";
import HistoryItem from "../components/HistoryItem";

const mapStateToProps = (state) => ({
  history: state.history,
});

export class GamesHistory extends Component {
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    const { fetchHistory } = this.props;
    fetchHistory();
  }
  
  render() {
    const ids = Object.keys(this.props.history);
  
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
            onClick={this.props.resetGameHistory}
          >
            <i className="fa fa-trash mr-2" aria-hidden="true"></i>
            Reset
          </button>
        </div>
        { ids.length > 0
          ? <ul className="list-group">
              {ids.map((id, idx) => (
                <HistoryItem
                  key={id}
                  position={idx}
                  winner={this.props.history[id].winner}
                  finishDateTime={this.props.history[id].finishDateTime}
                />
              ))}
            </ul>
          : <p>No history yet...</p>
          
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchHistory, resetGameHistory }
)(GamesHistory);

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
  }),
  fetchHistory: PropTypes.func,
  resetGameHistory: PropTypes.func,
};
