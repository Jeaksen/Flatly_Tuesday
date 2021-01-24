import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import appReducers from './AppReducers/appReducers'
import {composeWithDevTools} from 'redux-devtools-extension';

import FlatsManagement from './Flats/Components/FlatsManagement' 
import './App.scss';

import BookingsList from './Bookings/BookingsList' 
import BookingDetails from "./Bookings/BookingDetails";

import './App.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

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
              <span>Add New Flat Page</span>
            </Route>
            <Route path={`/flats/details/:flatId`}>
              <span>Flat Details Page</span>
            </Route>
            <Route path="/flats">
              <FlatsManagement />
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
