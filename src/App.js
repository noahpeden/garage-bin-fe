import React, { Component } from 'react';
import './App.css';
import Reveal from 'react-reveal';
import logo from './logo.svg';
import axios from 'axios';
import AddItem from './addItem.js'
import './App.css';
import 'animate.css/animate.css';
import {Link} from 'react-router';

class App extends Component {
  constructor(){
    super()
    this.state = {
      items: null,
      rancid: 0,
      dusty: 0,
      sparkling: 0,
      itemId: null,
      cleanliness: ''
    }
  }
  updateCleanliness(e, itemId){
    this.setState({
      cleanliness: e.target.value
    })
    this.patchCleanliness(itemId)
  }

  patchCleanliness(itemId){
    axios
    .patch(`https://garage-bin-be.herokuapp.com/api/v1/items/${itemId}`, {
      cleanliness: this.state.cleanliness
    })
    .then((response) => console.log(response))
  }

  openGarage(){
    axios
    .get('https://garage-bin-be.herokuapp.com/api/v1/items')
    .then((response) => {
      this.setState({
        items: response.data
      })
    })
    .then((response) => {
      this.cleanlinessCounter()
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
    let items = this.state.items
    items.forEach((item)=> {
      if(item.cleanliness === 'rancid'){
        this.setState({
          rancid: this.state.rancid + 1
        })
      }
      if(item.cleanliness === 'dusty'){
        this.setState({
          dusty: this.state.dusty + 1
        })
      }
      if(item.cleanliness === 'sparkling'){
        this.setState({
          sparkling: this.state.sparkling + 1
        })
      }
    })
  }

  itemId(item){
    console.log(item);
    this.setState({
      itemId: item,
      items: null
    })
  }

  goHome(){
    window.location.reload()
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
          {items && <div>Rancid: {this.state.rancid} Dusty: {this.state.dusty}  Sparkling: {this.state.sparkling}</div>}
          {items ? items.map((item)=> {
            return <div key={item.id}>
              <ul>
              Item: <Link to="/item" onClick={()=> this.itemId(item.id)}>{item.name}</Link>
              <li>Reason: {item.reason}</li>
              <li>Current Cleanliness: {item.cleanliness}</li>
              Change Cleanliness: <select onChange={(e) => this.updateCleanliness(e, item.id)} id="cleanliness" placeholder="Cleanliness">
                            <option value="Rancid">Rancid</option>
                            <option value="Dusty">Dusty</option>
                            <option value="Sparkling">Sparkling</option>
                          </select>
            </ul>
          </div>
          }) : <div>Door is closed</div>}
        </div>
        {this.state.itemId && React.cloneElement(this.props.children, {
          itemId: this.state.itemId
        }) }
        <AddItem />
      </div>
    );
  }
}


export default App;
