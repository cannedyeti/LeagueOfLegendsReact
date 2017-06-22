import React, { Component } from 'react';
import './App.css';
const Home = require('./components/Home');
const Nav = require('./components/Nav');
const Live = require('./components/Live');
const Streams = require('./components/Streams');
const Footer = require('./components/Footer');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <h1>League Of Legends React</h1>
            <Nav />
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/live' component={Live}/>
                <Route exact path='/streams' component={Streams}/>
                <Route render={function() {
                  return <p>404 Not Found</p>
                }} />
              </Switch>
              <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
