import {
  FLAT_LOADED,
  FLAT_LOADING,
  FLAT_LOADING_ERROR,
  FLAT_SAVING,
  FLAT_SAVING_ERROR,
  FLATS_URL,
  FLAT_CHANGED,
  FLAT_ADDRESS_CHANGED,
  DEBUGGING
} from '../../AppConstants/AppConstants'

export function flatLoaded(flatsResponse){
  return ({ type: FLAT_LOADED, payload: flatsResponse })
}

export function flatLoading(b){
  return ({ type: FLAT_LOADING, payload: b })
}


export function flatLoadingError(error) {
  return ({type: FLAT_LOADING_ERROR, payload: error})
}

export function flatSaving(b){
  return ({ type: FLAT_SAVING, payload: b })
}

export function flatSavingError(error) {
  return ({type: FLAT_SAVING_ERROR, payload: error})
}

export function onFlatChange(name, value) {
  return ({type: FLAT_CHANGED, payload: {name: name, value: value}})
}

export function onFlatAddressChange(name, value) {
  return ({type: FLAT_ADDRESS_CHANGED, payload: {name: name, value: value}})
}

export function loadFlatAsync(flatId) {
  if (DEBUGGING) {
    return async (dispatch) => {
      dispatch(flatLoading(true));
      let promise = fetch(FLATS_URL + `${flatId}`);
      promise.then(response => response.json())
          .then(json => dispatch(flatLoaded({
            ...json,
            images: [
              {
                id: "52d389b7-38f1-43b5-91d6-be9167940f16",
                fileName: "00017.jpg",
                fileType: "image/jpeg",
                flatId: 1,
                data: []
              },
              {
                id: "5752662f-bb11-4bd3-8f92-a4599398ad55",
                fileName: "00014.jpg",
                fileType: "image/jpeg",
                flatId: 1,
                data: []
              }
            ]
          })))
          .then(() => dispatch(flatLoading(false)))
          .catch((error) => dispatch(flatLoadingError(error)));
    }
  }
  return async (dispatch) => {
    dispatch(flatLoading(true));
    let promise = fetch(FLATS_URL + `${flatId}`);
    promise.then(response => response.json())
        .then(json => dispatch(flatLoaded(json)))
        .then(() => dispatch(flatLoading(false)))
        .catch((error) => dispatch(flatLoadingError(error)));
  }
}

export function addNewFlat(flat, uploadedFiles) {
  if (DEBUGGING) {
    return async (dispatch) => {
      dispatch(flatSaving(true));
      let promise = fetch(FLATS_URL, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(flat)
      });
      promise.then(response => response.json())
        .then(() => dispatch(flatSaving(false)))
        .catch((error) => dispatch(flatSavingError(error)))
        .finally(() => window.location.href = "/flats");
    }
  }
  return async (dispatch) => {
    dispatch(flatSaving(true));
    const formData = new FormData();
    for (let i = 0 ; i < uploadedFiles.length ; i++) {
      formData.append("new_images", uploadedFiles[i]);
    }
    for (var key in flat) {
      formData.append(key, flat[key]);
    }
    let promise = fetch(FLATS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    });
    promise.then(response => response.json())
      .then(() => dispatch(flatSaving(false)))
      .catch((error) => dispatch(flatSavingError(error)))
      .finally(() => window.location.href = "/flats");
  }
}
