//React
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

//App containing all parts
import App from './App.js';

//Redux
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import { createStore, combineReducers } from 'redux';
var reducer = combineReducers(reducers);
var store = createStore(reducer);



ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='*' component={App} />
    </Router>
  </Provider>, document.getElementById('content')
);