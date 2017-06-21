import React, { Component } from 'react';
import './App.css';
const Container = require('./components/Container')

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>League Of Legends React</h1>
        <Container />
      </div>
    );
  }
}

export default App;
