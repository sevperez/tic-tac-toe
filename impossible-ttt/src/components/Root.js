import React, { Component } from 'react';
import App from "./App";
import Nav from "./Nav";
import Footer from "./Footer";

export class Root extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <div className="wrapper">
          <Nav />
          <App />
          <div className="push"></div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Root;
