import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../helpers";

const HistoryItem = (props) => {
  let message = "";
  
  if (props.winner) {
    message = props.winner[0].toUpperCase() + props.winner.slice(1).toLowerCase();
  }
  
  if (props.winner !== "draw") {
    message += " wins!";
  }
  
  return (
    <li 
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span>
        <span className="mr-2">{(props.position + 1) + "."}</span>
        { message }
      </span>
      { props.finishDateTime &&
        <span
          className="badge primary-badge"
        >
          {formatDate(props.finishDateTime)}
        </span> 
      }
    </li>
  );
};

export default HistoryItem;

HistoryItem.propTypes = {
  winner: PropTypes.string,
  date: PropTypes.string,
};
