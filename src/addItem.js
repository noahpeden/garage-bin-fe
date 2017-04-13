import React, { Component } from 'react';
import axios from 'axios';

class AddItem extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      reason: '',
      cleanliness: '',
    }
    this.updateInput = this.updateInput.bind(this)
  }
  addNewItem(){
    axios
    .post("https://garage-bin-be.herokuapp.com/api/v1/items", {
      name: this.state.name,
      reason: this.state.reason,
      cleanliness: this.state.cleanliness
    })
    .then((response)=>{
      console.log(response);
    })
  }

  updateInput(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  render() {
    return (
        <div>
          Add a new item:
          <form onSubmit={(e) => {
            e.preventDefault()
            this.addNewItem()
            this.setState({
              name: '',
              reason: '',
              cleanliness: '',
            })
          }}>
          <input placeholder="Name"
            onChange={this.updateInput}
            value={this.state.name}
            id="name"/>
          <input placeholder="Reason"
              onChange={this.updateInput}
              value={this.state.reason}
            id="reason"/>
          <input placeholder="Cleanliness"
                  onChange={this.updateInput}
                  value={this.state.cleanliness}
                id="cleanliness"/>
=                <button>Submit</button>
              </form>
        </div>
      );
    }
  }


export default AddItem;
