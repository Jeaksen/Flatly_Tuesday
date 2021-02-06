import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import appReducers from './AppReducers/appReducers'
import {composeWithDevTools} from 'redux-devtools-extension';

import FlatsList from './Flats/Components/FlatsList' 
import FlatForm from './Flats/Components/FlatForm';

import './App.scss';
import './App.css';

import BookingsList from './Bookings/BookingsList' 
import BookingDetails from "./Bookings/BookingDetails";


import LoginPage from './LoginPage'

import './App.css';

const store = createStore(appReducers, {}, composeWithDevTools((applyMiddleware(reduxThunk))));

function App() {
  return (
    <Provider store = {store}>
      <Router>
        <div>
          <span>FLATLY</span>
          <Switch>
            <Route path={`/bookings/details/:bookingId`}>
              <NavigatorBar />
              <BookingDetails />
            </Route>
            <Route path="/bookings">
              <NavigatorBar />
              <BookingsList />
            </Route>
            <Route path="/flats/add">
              <NavigatorBar />
              <FlatForm />
            </Route>
            <Route path={`/flats/details/:flatId`}>
              <NavigatorBar />
              <span>Flat Details Page</span>
            </Route>
            <Route path="/flats">
              <NavigatorBar />
              <FlatsList />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

function NavigatorBar() {
  return(
    <ul>
      <li>
        <Link to="/bookings">
          Bookings
        </Link>
      </li>
      <li>
        <Link to="/flats">
          Flats
        </Link>
      </li>
      <li>
        <button>Log Out</button>
      </li>
    </ul>
  )
}

export default App;
