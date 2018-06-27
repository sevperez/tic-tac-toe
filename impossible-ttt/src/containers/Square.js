import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerMove } from "../actions";

const mapStateToProps = (state) => ({
  nextPlayer: state.currentGame && state.currentGame.nextPlayer,
  humanToken: state.currentGame && state.currentGame.humanToken,
  computerToken: state.currentGame && state.currentGame.computerToken,
});

export class Square extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
    this.getCurrentToken = this.getCurrentToken.bind(this);
  }
  
  getCurrentToken() {
    const { nextPlayer, humanToken, computerToken } = this.props;
    return nextPlayer === "human" ? humanToken : computerToken;
  }
  
  handleClick() {
    const { token, location, registerMove, nextPlayer } = this.props;
    
    if (!token && nextPlayer) {
      const moveData = {
        token: this.getCurrentToken(),
        location,
      };
      
      registerMove(moveData);
    }
  }
  
  render() {
    return (
      <div
        className="col-4 square"
        onClick={this.handleClick}
      >
        <span>{this.props.token}</span>
      </div>
    );
  }
}

export default connect(mapStateToProps, { registerMove })(Square);

Square.propTypes = {
  token: PropTypes.string,
  location: PropTypes.arrayOf(PropTypes.number),
  registerMove: PropTypes.func,
  nextPlayer: PropTypes.string,
  humanToken: PropTypes.string,
  computerToken: PropTypes.string,
};
