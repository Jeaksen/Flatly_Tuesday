
const baseState = {list: [], loading: false, saving: false, error: null}

export default function flatListReducer(state = baseState, action) 
{
    switch(action.type) 
    {
        case "flatListLoaded":
            return {...state, list: action.payload, loading: false}

        case "flatListLoading":
            return {...state, loading: true}

        case "flatListLoadingError":
            return {...state, loading: false, saving: false, error: action.payload}

        case "flatListSaved":
            return {...state, loading: false, saving: false}

        case "flatListSaving":
            return {...state, loading: false, saving: true}

        case "flatListSavingError":
            return {...state, loading: false, saving: false, error: action.payload}

        case "flatDeleting":
            const updatedList = state.list.map(flat => flat.id === action.payload ? {...flat, deleting: true} : flat)
            return {...state, list: updatedList, loading: false, saving: false}

        case "flatDeletingError":
            return {...state, loading: false, saving: false, error: action.payload}
            
        default:
            return state;
    }
}