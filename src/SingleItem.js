import React, { Component } from 'react';
import axios from 'axios'

class SingleItem extends Component {
  constructor(props){
    super()
    this.state = {
      items1: null,
    }
  }

  componentDidMount(){
    axios
    .get(`https://garage-bin-be.herokuapp.com/api/v1/items/${this.props.itemId}`)
    .then((response) => {
      this.setState({
        items1: response.data
      })
    })
  }

  render(){
    return (
      <div>
        {this.state.items1 && this.state.items1.map((item)=> {
          return <ul>
            <li>Name: {item.name}</li>
            <li>Reason: {item.reason}</li>
            <li>Cleanliness: {item.cleanliness}</li>
          </ul>
        })}
      </div>
      );
    }
  }

  export default SingleItem;
