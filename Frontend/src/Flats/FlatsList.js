import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { loadFlatListAsync, addNewFlat, deleteFlat } from './Actions/flatsActions'

import Flat from "./Flat";
import "./FlatsList.css"
import FlatAddComponent from "./FlatAddComponent";

const mapStateToProps = (state, ownProps) => ({ 
    flats: state.flats.list,
    loading: state.flats.loading,
    saving: state.flats.saving,
    error: state.flats.error
});

const mapDispatchToProps = (dispatch) => ({
    loadFlatListAsync: () => dispatch(loadFlatListAsync()),
    addNewFlat: (flat) => dispatch(addNewFlat(flat)),
    deleteFlat: (flatId) => dispatch(deleteFlat(flatId))
})

function FlatList(props)
{   
    useEffect(() => {props.loadFlatListAsync()}, [])
    if (props.loading) {
        return (<label>Loading...</label>)
    }
    if (props.error) {
        return (<label>Fetch error</label>)
    }
    if (props.flats && props.flats.length > 0)
        return (
            <div className="FlatListPanel">
                <FlatAddComponent addNewFlat={props.addNewFlat} saving={props.saving}/>
                <ul className="FlatList">{props.flats.map((flat) => {
                        return <Flat key={flat.id} flat={flat} deleteFlat={props.deleteFlat} />
                    })}
                </ul>
            </div>
        )
    return <div />
}


export default connect(mapStateToProps, mapDispatchToProps)(FlatList);