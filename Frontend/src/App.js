import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk'

import appReducers from './AppReducers/appReducers'
import {composeWithDevTools} from 'redux-devtools-extension';
import BookingsList from './Bookings/BookingsList' 

import './App.css';

const store = createStore(appReducers, {}, composeWithDevTools((applyMiddleware(reduxThunk))));

function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <BookingsList />
      </Provider>
    </div>
  );
}

export default App;
