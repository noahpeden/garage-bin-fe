import React, { Component } from 'react';
import './App.css';
import Reveal from 'react-reveal';
import logo from './logo.svg';
import './App.css';
import 'animate.css/animate.css';

class App extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  openGarage(){
    axios
    .get('')
  }

  render() {
    return (
        <div className="App">
          <h1>Garage Bin - Check What Items Lie in the Beyond!</h1>
          <button>Open!</button>
          <button>Close!</button>
          <div>

          </div>
        </div>
      );
    }
  }


export default App;
