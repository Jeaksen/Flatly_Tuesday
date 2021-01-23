const baseState = {list: [], loading: false, saving: false, error: null}

export default function bookingsListReducer(state = baseState, action) 
{
    switch(action.type) 
    {
        case "bookingsListLoaded":
            return {...state, list: action.payload, loading: false}

        case "bookingsListLoading":
            return {...state, loading: true}

        case "bookingsListLoadingError":
            return {...state, loading: false, saving: false, error: action.payload}

        case "bookingsListSaved":
            return {...state, loading: false, saving: false}

        case "bookingsListSaving":
            return {...state, loading: false, saving: true}

        case "bookingsListSavingError":
            return {...state, loading: false, saving: false, error: action.payload}

        case "bookingCanceling":
            const updatedList = state.list.map(booking => booking.id === action.payload ? {...booking, canceling: true} : booking)
            return {...state, list: updatedList, loading: false, saving: false}

        case "bookingCancelingError":
            return {...state, loading: false, saving: false, error: action.payload}
            
        default:
            return state;
    }
}