export function flatListLoaded(list) {
    return ({type: "flatListLoaded", payload: list})
}

export function flatListLoading() {
    return ({type: "flatListLoading"})
}

export function flatListLoadingError(error) {
    return ({type: "flatListLoadingError", payload: error})
}

export function loadFlatListAsync() {
    return async (dispatch) => {
        try {
            dispatch(flatListLoading());
            const response = await fetch("http://localhost:8080/flats/");
            const json = await response.json();
            dispatch(flatListLoaded(json));
        } catch(error) {
            console.error(error);
            dispatch(flatListLoadingError(error));
        }
    }
}

export function flatListSaved(list) {
    return ({type: "flatListSaved", payload: list})
}

export function flatListSaving() {
    return ({type: "flatListSaving"})
}

export function flatListSavingError(error) {
    return ({type: "flatListSavingError", payload: error})
}

export function addNewFlat(flat) {
    const flats = [flat]
    return async (dispatch) => {
        try {
            dispatch(flatListSaving());
            await fetch("http://localhost:8080/flats/", {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(flats)
            });
            dispatch(flatListSaved());
        } catch(error) {
            console.error(error);
            dispatch(flatListSavingError(error));
        } finally {
            dispatch(loadFlatListAsync());
        }
    }
}

export function flatDeleting(flatId) {
    return {type: "flatDeleting", payload: flatId}
}

export function flatDeletingError(error) {
    return ({type: "flatDeletingError", payload: error})
}

export function deleteFlat(flatId) {
    return async (dispatch) => {
        try {
            dispatch(flatDeleting(flatId))
            await fetch("http://localhost:8080/flats/" + flatId, {method: 'DELETE'});
            dispatch(loadFlatListAsync());
        } catch(error) {
            console.error(error);
            dispatch(flatDeletingError(error))
        }
    }
}