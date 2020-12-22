import { combineReducers } from 'redux';
import flatsReducer from '../Flats/Reducers/flatsReducer';


 const appReducers = combineReducers({
     flats: flatsReducer
 });

 export default appReducers;