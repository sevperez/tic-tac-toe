import React from "react";

const HistoryArea = () => {
  return (
    <div id="history">
      <div className="py-4">
        <div className="header">
          <h3>
            <i className="fa fa-history mr-2" aria-hidden="true"></i>
            Round History
          </h3>
        </div>
        <ul className="list-group">
          <li 
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            Computer wins!
            <span className="badge primary-badge">14 June 2018</span>
          </li>
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            Draw
            <span className="badge primary-badge">14 June 2018</span>
          </li>
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            Draw
            <span className="badge primary-badge">14 June 2018</span>
          </li>
        </ul>
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
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            Draw
            <span className="badge primary-badge">8 June 2018</span>
          </li>
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            Computer wins!
            <span className="badge primary-badge">10 June 2018</span>
          </li>
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            Computer wins!
            <span className="badge primary-badge">13 June 2018</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HistoryArea;
