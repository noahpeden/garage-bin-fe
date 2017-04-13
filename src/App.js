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

  compare(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  sortName(){
    let sortedItems = this.state.items.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
    this.setState({
      items: sortedItems
    })
  }

  cleanlinessCounter(){
    Object.keys(this.state.items)
  }

  render() {
    let items = this.state.items
    return (
      <div className="App">
        <h1>Garage Bin - Check What Items Lie in the Beyond!</h1>
        <button onClick={() => this.openGarage()}>Open!</button>
        <button onClick={() => this.closeGarage()}>Close!</button>
        <button onClick={() => this.sortName()}>Sort By Name</button>
        <div>
          {items ? <h3>Number of Items: {items.length}</h3> : <div></div> }
          {items ? items.map((item)=> {
            return <div key={item.id}>
              <ul>
              <li>Name: {item.name}</li>
              <li>Reason: {item.reason}</li>
              <li>cleanliness: {item.cleanliness}</li>
            </ul>
          </div>
          }) : <div>Door is closed</div>}
        </div>
        <AddItem />
      </div>
    );
  }
}


export default App;
