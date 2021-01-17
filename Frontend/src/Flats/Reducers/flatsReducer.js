import {
  FLATS_LOADED,
  FLATS_LOADING,
  FLATS_LOADING_ERROR,
  FLATS_SAVING,
  FLATS_SAVING_ERROR,
  FLATS_DELETING,
  FLATS_DELETING_ERROR,
  FLATS_SHOWING_FORM
} from '../../AppConstants/AppConstants'

const baseState = {
  flats: [], 
  loading: false, 
  saving: false,
  isShowingForm: false,
  error: null,
  idDeleting: -1
}

export default function flatListReducer(state = baseState, action) 
{
  switch(action.type) 
  {
    case FLATS_LOADED:
      return {...state, flats: action.payload, loading: false, error: null}

    case FLATS_LOADING:
      return {...state, loading: action.payload, error: null}

    case FLATS_LOADING_ERROR:
      return {...state, loading: false, saving: false, isShowingForm: false, error: action.payload}

    case FLATS_SAVING:
      return {...state, loading: false, saving: action.payload, isShowingForm: false, error: null}

    case FLATS_SAVING_ERROR:
      return {...state, loading: false, saving: false,  isShowingForm: false, error: action.payload}

    case FLATS_DELETING:
      return {...state, loading: false, saving: false, isShowingForm: false, idDeleting: action.payload, error: null}

    case FLATS_DELETING_ERROR:
      return {...state, loading: false, saving: false,  isShowingForm: false, error: action.payload}

    case FLATS_SHOWING_FORM:
      return {...state, loading: false, saving: false,  isShowingForm: action.payload, error: null}
        
    default:
      return state;
  }
}