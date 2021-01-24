import {
    FLATS_LOADED,
    FLATS_LOADING,
    FLATS_LOADING_ERROR,
    FLATS_SAVING,
    FLATS_SAVING_ERROR,
    FLATS_DELETING,
    FLATS_DELETING_ERROR,
    FLATS_SHOWING_FORM,
    FLATS_URL
} from '../../AppConstants/AppConstants';

export function flatListLoaded(flats){
    return ({ type: FLATS_LOADED, payload: flats })
}

export function flatListLoading(b){
    return ({ type: FLATS_LOADING, payload: b })
}


export function flatListLoadingError(error) {
    return ({type: FLATS_LOADING_ERROR, payload: error})
}

export function flatSaving(b){
    return ({ type: FLATS_SAVING, payload: b })
}

export function flatSavingError(error) {
    return ({type: FLATS_SAVING_ERROR, payload: error})
}

export function flatDeleting(flatId) {
    return ({type: FLATS_DELETING, payload: flatId })
}

export function flatDeletingError(error) {
    return ({type: FLATS_DELETING_ERROR, payload: error})
}

export function flatListShowingForm(b){
    return ({ type: FLATS_SHOWING_FORM, payload: b })
}

export function loadFlatListAsync() {
  return async (dispatch) => {
    dispatch(flatListLoading(true));
    let promise = fetch(FLATS_URL);
    promise.then(response => response.json())
        .then(json => dispatch(flatListLoaded(json)))
        .then(() => dispatch(flatListLoading(false)))
        .catch((error) => dispatch(flatListLoadingError(error)));
  }
}

export function addNewFlat(flat) {
  return async (dispatch) => {
    dispatch(flatListShowingForm(false));
    dispatch(flatSaving(true));
    let promise = fetch(FLATS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(flat)
    });
    promise.then(response => response.json())
      .then(() => dispatch(flatSaving(false)))
      .catch((error) => dispatch(flatSavingError(error)))
      .finally(() => dispatch(loadFlatListAsync()));
  }
}

export function deleteFlat(flatId) {
  return async (dispatch) => {
    dispatch(flatDeleting(flatId))
    let promise = fetch(FLATS_URL + flatId, {method: "DELETE"});
    promise.then(response => response.json())
        .then(() => dispatch(flatDeleting(-1)))
        .catch((error) => dispatch(flatDeletingError(error)))
        .finally(() => dispatch(loadFlatListAsync()));
  }
}

export function adjustForm(b) {
  return async (dispatch) => { 
    dispatch(flatListShowingForm(b));
    dispatch(loadFlatListAsync());
  }
}