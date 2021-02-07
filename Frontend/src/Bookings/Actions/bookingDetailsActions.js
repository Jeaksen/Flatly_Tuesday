import { BOOKINGS_URL } from '../../AppConstants/AppConstants';

export function bookingDetailsLoaded(booking) {
    return ({type: "bookingDetailsLoaded", payload: booking})
}

export function bookingDetailsLoading() {
    return ({type: "bookingDetailsLoading"})
}

export function bookingDetailsLoadingError(error) {
    return ({type: "bookingDetailsLoadingError", payload: error})
}

export function loadBookingDetailsAsync(bookingId) {
    return async (dispatch) => {
        try {
            dispatch(bookingDetailsLoading());
            const response = await fetch(BOOKINGS_URL + bookingId);
            const json = await response.json();
            dispatch(bookingDetailsLoaded(json));
        } catch(error) {
            console.error(error);
            dispatch(bookingDetailsLoadingError(error));
        }
    }
}
