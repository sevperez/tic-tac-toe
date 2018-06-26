import React from "react";
import PropTypes from "prop-types";

const Square = (props) => {
  return (
    <div
      className="col-4 square"
      onClick={() => console.log("square clicked!")}
    >
      <span>{props.token}</span>
    </div>
  );
};

export default Square;

Square.propTypes = {
  token: PropTypes.string
};
