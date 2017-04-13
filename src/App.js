import React, { Component } from 'react';
import './App.css';
import Reveal from 'react-reveal';
import logo from './logo.svg';
import axios from 'axios';
import AddItem from './addItem.js'
import './App.css';
import 'animate.css/animate.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      items: null,
    }
  }
  openGarage(){
    axios
    .get('https://garage-bin-be.herokuapp.com/api/v1/items')
    .then((response) => {
      this.setState({
        items: response.data
      })
    })
  }

  closeGarage(){
    this.setState({
      items: null,
    })
  }

  render() {
    let items = this.state.items
    return (
        <div className="App">
          <h1>Garage Bin - Check What Items Lie in the Beyond!</h1>
          <button onClick={() => this.openGarage()}>Open!</button>
          <button onClick={() => this.closeGarage()}>Close!</button>
          <div>
            {items ? items.map((item)=> {
              return <ul>
                <li>Name: {item.name}</li>
                <li>Reason: {item.reason}</li>
                <li>cleanliness: {item.cleanliness}</li>
              </ul>
            }) : <div>Door is closed</div>}
          </div>
          <AddItem />
        </div>
      );
    }
  }


export default App;
