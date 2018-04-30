import React, { Component } from "react";
import "../App/App.css";
import Topic from "../Topic/Topic";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Topic title="Learn new things!" />
      </div>
    );
  }
}

export default App;
