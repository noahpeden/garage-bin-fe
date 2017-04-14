import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import AddItem from './addItem';
import SingleItem from './SingleItem'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route path="/item" component={SingleItem}/>
    </Route>
  </Router>
, document.getElementById('root'));
