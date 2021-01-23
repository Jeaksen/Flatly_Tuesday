const baseState = {booking: null, loading: false, saving: false, error: null}

export default function bookingDetailsReducer(state = baseState, action) 
{
    switch(action.type) 
    {
        case "bookingDetailsLoaded":
            return {...state, booking: action.payload, loading: false}
        
        case "bookingDetailsLoading":
            return {...state, loading: true}
        
        case "bookingDetailsLoadingError":
            return {...state, loading: false, saving: false, error: action.payload}

        default:
            return state;
    }
}