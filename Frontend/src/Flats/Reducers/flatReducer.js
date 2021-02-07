import {
  FLAT_LOADED,
  FLAT_LOADING,
  FLAT_LOADING_ERROR,
  FLAT_SAVING,
  FLAT_SAVING_ERROR,
  FLAT_CHANGED,
  FLAT_ADDRESS_CHANGED,
} from '../../AppConstants/AppConstants'

const baseState = {
  flat: {
    id: 0,
    name: "",       
    maxGuests: 1,
    price: 0,
    flatType: "",
    address: {
      country: "", 
      city: "", 
      streetName: "", 
      postCode: "", 
      buildingNumber: "", 
      flatNumber: ""
    },
    images: []
  },
  loading: false, 
  saving: false,
  error: null
}
export default function flatReducer(state = baseState, action) 
{
  switch(action.type) 
  {
    case FLAT_LOADED:
      return {
        ...state, 
        flat: action.payload,
        loading: false, 
        error: null
      }

    case FLAT_LOADING:
      return {...state, loading: action.payload, error: null}

    case FLAT_LOADING_ERROR:
      alert('Error: ' + action.payload);
      return {...state, loading: false, saving: false, error: action.payload}

    case FLAT_SAVING:
      return {...state, loading: false, saving: action.payload, error: null}

    case FLAT_SAVING_ERROR:
      alert('Error: ' + action.payload);
      return {...state, loading: false, saving: false,  error: action.payload}

    case FLAT_CHANGED:
      return {
        ...state, 
        flat: {
          ...state.flat,
          [action.payload.name]: action.payload.value
        }
      }

      case FLAT_ADDRESS_CHANGED:
        return {
          ...state, 
          flat: {
            ...state.flat,
            address: {
              ...state.flat.address,
              [action.payload.name]: action.payload.value
            }
          }
        }
    default:
      return state;
  }
}