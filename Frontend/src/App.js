import React, {Fragment} from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import appReducers from './AppReducers/appReducers'
import {composeWithDevTools} from 'redux-devtools-extension';
import {  Nav,  Navbar,  Form, Button} from 'react-bootstrap';
import { withRouter } from "react-router";

import FlatsList from './Flats/Components/FlatsList' 
import FlatForm from './Flats/Components/FlatForm';
import BookingsList from './Bookings/BookingsList' 
import BookingDetails from "./Bookings/BookingDetails";
import LoginPage from './LoginPage'

import './App.css';
import './App.scss';
const store = createStore(appReducers, {}, composeWithDevTools((applyMiddleware(reduxThunk))));


function NavigatorBar() {
  return(
  <Navbar bg="dark" 
  variant="dark" 
  className='NavBar'>
    <Navbar.Brand href="/flats">FLATLY</Navbar.Brand>
    <Nav className="mr-auto" activeKey={window.location.pathname}>
      <Nav.Link href="/flats" >Flats</Nav.Link>
      <Nav.Link href="/bookings" >Bookings</Nav.Link>
    </Nav>
    <Form inline>
      <Button className="ButtonLogout" >Log Out</Button>
    </Form>
  </Navbar>
  )
}
const HeaderWithRouter = withRouter(NavigatorBar);
function App() {
  const mainURL = "http://localhost:8080";

  return (
    <Provider store = {store}>
      <Router>
        <Fragment>
          <HeaderWithRouter />
          <Route path={`/bookings/details/:bookingId`} exact>
            <BookingDetails mainURL={mainURL} />
          </Route>
          <Route path="/bookings/flatId=:flatId" exact>
            <BookingsList mainURL={mainURL} />
          </Route>
          <Route path="/bookings" exact>
            <BookingsList mainURL={mainURL} />
          </Route>
          <Route path="/flats/add" exact>
            <FlatForm mode='create'/>
          </Route>
          <Route path={`/flats/details/:flatId`} exact>
            <FlatForm mode='view'/>
          </Route>
          <Route path={`/flats/edit/:flatId`} exact>
            <FlatForm mode='edit'/>
          </Route>
          <Route path="/flats" exact>
            <FlatsList />
          </Route>
          <Route path="/" exact>
            <LoginPage />
          </Route>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
