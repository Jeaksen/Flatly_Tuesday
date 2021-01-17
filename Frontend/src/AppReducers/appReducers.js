import { combineReducers } from 'redux';
import flatsReducer from '../Flats/Reducers/flatsReducer';
import bookingsReducer from '../Bookings/Reducers/bookingsReducer';


 const appReducers = combineReducers({
     flats: flatsReducer,
     bookings: bookingsReducer
 });

 export default appReducers;