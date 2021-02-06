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


const store = createStore(appReducers, {}, composeWithDevTools((applyMiddleware(reduxThunk))));

function App() {
  return (
    <Provider store = {store}>
      <Router>
        <div>
          <span>FLATLY</span>
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
          <Switch>
            <Route path={`/bookings/details/:bookingId`}>
              <BookingDetails />
            </Route>
            <Route path="/bookings">
              <BookingsList />
            </Route>
            <Route path="/flats/add">
              <FlatForm />
            </Route>
            <Route path={`/flats/details/:flatId`}>
              <span>Flat Details Page</span>
            </Route>
            <Route path="/flats">
              <FlatsList />
            </Route>
            <Route path="/">
              <span>Login Page</span>
              <Link to="/bookings">Bookings</Link>
              <Link to="/flats">Flats</Link>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
