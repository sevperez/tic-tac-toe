import React, { Component } from "react";
import { connect } from "react-redux";
import { startNewGame } from "../actions";

export class NewGameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPlayer: "human",
      numRounds: "1",
      playerToken: "X",
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange(e) {
    const target = e.target;
    const val = target.value;
    const name = target.name;
    
    this.setState({
      [name]: val,
    });
  }
  
  getComputerToken() {
    if (this.state.playerToken.toLowerCase() === "x") {
      return "O";
    } else {
      return "X";
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    let newGame = {
      winner: null,
      startDateTime: new Date().toISOString(),
      finishDateTime: null,
      numRounds: Number(this.state.numRounds),
      nextPlayer: this.state.firstPlayer,
      humanToken: this.state.playerToken,
      computerToken: this.getComputerToken(),
      currentBoard: [[null, null, null], [null, null, null], [null, null, null]],
      rounds: [],
    };
    
    this.props.startNewGame(newGame);
  }
  
  render() {
    return (
      <form
        className="mb-4"
        onSubmit={this.handleSubmit}
      >
        <div className="row">
          <div className="form-group col-sm-4">
            <label htmlFor="firstPlayer">
              <i className="fa fa-user mr-2" aria-hidden="true"></i>
              First Player
            </label>
            <select 
              className="form-control"
              name="firstPlayer"
              value={this.state.firstPlayer}
              onChange={this.handleInputChange}
            >
              <option value="human">Human</option>
              <option value="computer">Computer</option>
            </select>
          </div>
          <div className="form-group col-sm-4">
            <label htmlFor="numRounds">
              <i className="fa fa-refresh mr-2" aria-hidden="true"></i>
              Rounds
            </label>
            <select
              className="form-control"
              name="numRounds"
              value={this.state.numRounds}
              onChange={this.handleInputChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="form-group col-sm-4">
            <label htmlFor="playerToken">
              <i className="fa fa-cog mr-2" aria-hidden="true"></i>
              Token
            </label>
            <input
              type="text"
              className="form-control"
              id="playerToken"
              name="playerToken"
              value={this.state.playerToken}
              onChange={this.handleInputChange}
              minLength="1"
              maxLength="1"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-block primary-btn">
          Play
        </button>
      </form>
    );
  }
}

export default connect(null, { startNewGame })(NewGameForm);
