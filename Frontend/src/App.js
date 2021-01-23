import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk'

import appReducers from './AppReducers/appReducers'
import {composeWithDevTools} from 'redux-devtools-extension';
import FlatsManagement from './Flats/Components/FlatsManagement' 
import './App.scss';
import './App.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const store = createStore(appReducers, {}, composeWithDevTools((applyMiddleware(reduxThunk))));

function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <FlatsManagement />
      </Provider>
    </div>
  );
}

export default App;
