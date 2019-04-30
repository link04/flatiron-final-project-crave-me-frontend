import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer.js';
import genderReducer from './reducers/genderReducer.js';
import menuChoiceReducer from './reducers/menuChoiceReducer.js';
import craveReducer from './reducers/menuChoiceReducer.js';


import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const rootReducer = combineReducers({
  userReducer,
  genderReducer,
  menuChoiceReducer,
  craveReducer
})

const store  = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
