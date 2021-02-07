export function bookingsListLoaded(list) {
    return ({type: "bookingsListLoaded", payload: list})
}

export function bookingsListLoading() {
    return ({type: "bookingsListLoading"})
}

export function bookingsListLoadingError(error) {
    return ({type: "bookingsListLoadingError", payload: error})
}

export function loadBookingsListAsync(URL, pageNumber) {
    return async (dispatch) => {
        try {
            dispatch(bookingsListLoading());
            const response = await fetch(URL);
            const json = await response.json();
            dispatch(bookingsListLoaded({
                content: json,
                pageable: {
                  sort: {
                    sorted: false,
                    unsorted: true,
                    empty: true
                  },
                  offset: 0,
                  pageNumber: pageNumber,
                  pageSize: 10,
                  unpaged: false,
                  paged: true
                },
                totalPages: 10,
                totalElements: 95,
                last: false,
                size: json.length,
                number: 0,
                sort: {
                  sorted: false,
                  unsorted: true,
                  empty: true
                },
                numberOfElements: json.length,
                first: true,
                empty: false
              }));
        } catch(error) {
            console.error(error);
            dispatch(bookingsListLoadingError(error));
        }
    }
}

export function bookingCanceling(bookingId) {
    return {type: "bookingCanceling", payload: bookingId}
}

export function bookingCancelingError(error) {
    return ({type: "bookingCancelingError", payload: error})
}

export function cancelBooking(URL, bookingId) {
    return async (dispatch) => {
        try {
            dispatch(bookingCanceling(bookingId))
            await fetch(`${URL}/bookings/` + bookingId, {method: 'DELETE'});
            dispatch(loadBookingsListAsync());
        } catch(error) {
            console.error(error);
            dispatch(bookingCancelingError(error))
        }
    }
}
