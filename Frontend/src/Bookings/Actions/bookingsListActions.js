export function bookingsListLoaded(list) {
    return ({type: "bookingsListLoaded", payload: list})
}

export function bookingsListLoading() {
    return ({type: "bookingsListLoading"})
}

export function bookingsListLoadingError(error) {
    return ({type: "bookingsListLoadingError", payload: error})
}

export function loadBookingsListAsync() {
    return async (dispatch) => {
        try {
            dispatch(bookingsListLoading());
            const response = await fetch("http://localhost:8080/bookings/");
            const json = await response.json();
            dispatch(bookingsListLoaded(json));
        } catch(error) {
            console.error(error);
            dispatch(bookingsListLoadingError(error));
        }
    }
}

export function bookingsListSaved(list) {
    return ({type: "bookingsListSaved", payload: list})
}

export function bookingsListSaving() {
    return ({type: "bookingsListSaving"})
}

export function bookingsListSavingError(error) {
    return ({type: "bookingsListSavingError", payload: error})
}

export function bookingCanceling(bookingId) {
    return {type: "bookingCanceling", payload: bookingId}
}

export function bookingCancelingError(error) {
    return ({type: "bookingCancelingError", payload: error})
}

export function cancelBooking(bookingId) {
    return async (dispatch) => {
        try {
            dispatch(bookingCanceling(bookingId))
            await fetch("http://localhost:8080/bookings/" + bookingId, {method: 'DELETE'});
            dispatch(loadBookingsListAsync());
        } catch(error) {
            console.error(error);
            dispatch(bookingCancelingError(error))
        }
    }
}
