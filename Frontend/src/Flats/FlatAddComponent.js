import React from 'react';
import { useState } from 'react';

function NewFlat(props) 
{
    const baseFlat = {isActive: false, name: "", address: {country: "", city: "", streetName: "", postCode: "", buildingNumber: "", flatNumber: ""}}
    const [flat, setFlat] = useState(baseFlat)

    const changeName = (e) => setFlat({...flat, name: e.target.value})
    const changeIsActive = () => setFlat({...flat, isActive: !flat.isActive})

    const changeCountry = (e) => setFlat({...flat, address: {...flat.address, country: e.target.value}})
    const changeCity = (e) => setFlat({...flat, address: {...flat.address, city: e.target.value}})
    const changeStreetName = (e) => setFlat({...flat, address: {...flat.address, streetName: e.target.value}})
    const changePostCode = (e) => setFlat({...flat, address: {...flat.address, postCode: e.target.value}})
    const changeBuildingNumber = (e) => setFlat({...flat, address: {...flat.address, buildingNumber: e.target.value}})
    const changeFlatNumber = (e) => setFlat({...flat, address: {...flat.address, flatNumber: e.target.value}})


    const onClickCancelButton = () => {
        setFlat(baseFlat);
        props.hideForm();
    }

    const onClickSubmitButton = () => {
        props.addNewFlat(flat);
        setFlat(baseFlat);
    }

    if (props.saving)
        return "Saving...";

    return (
        <div>
            <div>
                <span>Name </span>
                <input value={flat.name} onChange={(e) => changeName(e)} type="text"/>
            </div>
            <div>
                <label>Address</label>
                <div>
                    <span>Cuntry </span>
                    <input value={flat.address.country} onChange={(e) => changeCountry(e)} type="text"/>
                </div>
                <div>
                    <span >City </span>
                    <input  value={flat.address.city} onChange={(e) => changeCity(e)} type="text"/>
                </div>
                <div>
                    <span >Street Name </span>
                    <input  value={flat.address.streetName} onChange={(e) => changeStreetName(e)} type="text"/>
                </div>
                <div>
                    <span >Building Number </span>
                    <input  value={flat.address.buildingNumberail} onChange={(e) => changeBuildingNumber(e)} type="text"/>
                </div>
                <div>
                    <span >Post Code </span>
                    <input  value={flat.address.postCode} onChange={(e) => changePostCode(e)} type="text"/>
                </div>
                <div>
                    <span >FlatNumber </span>
                    <input  value={flat.address.flatNumber} onChange={(e) => changeFlatNumber(e)} type="text"/>
                </div>
            </div>
            <div>
                <span >IsActive </span>
                <input type="checkbox" checked={flat.active} onChange={() => changeIsActive()}/>
                <button onClick={() => onClickCancelButton()}>Cancel</button>
                <button onClick={() => onClickSubmitButton()}>Submit</button>
            </div>
        </div>
    );
    
}

export default function FlatAddComponent(props) 
{
    const baseFlat = {isActive: false, name: "", address: {country: "", city: "", streetName: "", postCode: "", buildingNumber: "", flatNumber: ""}}
    const [flat, setFlat] = useState(baseFlat)
    const [isEditing, setIsEditing] = useState(false);

    const changeName = (e) => setFlat({...flat, name: e.target.value})
    const changeIsActive = () => setFlat({...flat, isActive: !flat.isActive})

    const changeCountry = (e) => setFlat({...flat, address: {...flat.address, country: e.target.value}})
    const changeCity = (e) => setFlat({...flat, address: {...flat.address, city: e.target.value}})
    const changeStreetName = (e) => setFlat({...flat, address: {...flat.address, streetName: e.target.value}})
    const changePostCode = (e) => setFlat({...flat, address: {...flat.address, postCode: e.target.value}})
    const changeBuildingNumber = (e) => setFlat({...flat, address: {...flat.address, buildingNumber: e.target.value}})
    const changeFlatNumber = (e) => setFlat({...flat, address: {...flat.address, flatNumber: e.target.value}})


    const onClickAddButton = () => setIsEditing(true)

    const onClickCancelButton = () => {
        setIsEditing(false)
        setFlat(baseFlat)
    }

    const onClickSubmitButton = () => {
        setIsEditing(false);
        props.addNewFlat(flat);
        setFlat(baseFlat)
    }

    if (props.saving)
        return (<label>Saving...</label>);
    else if (isEditing)
    {
        return (
            <div className="addFlatForm">
                <h2>Add New Flat</h2>
                <div>
                    <span className="addFlatInputLabel" >IsActive</span>
                    <input className="addFlatInput" type="checkbox" checked={flat.isActive} onChange={() => changeIsActive()}/>
                </div>
                <div>
                    <span className="addFlatInputLabel" >Name</span>
                    <input className="addFlatInput" value={flat.name} onChange={(e) => changeName(e)} type="text"/>
                </div>
                <div>
                <label>Address</label>
`                    <div>
                        <span className="addFlatInputLabel">Cuntry </span>
                        <input className="addFlatInput" value={flat.address.country} onChange={(e) => changeCountry(e)} type="text"/>
                    </div>
                    <div>
                        <span className="addFlatInputLabel">City </span>
                        <input className="addFlatInput" value={flat.address.city} onChange={(e) => changeCity(e)} type="text"/>
                    </div>
                    <div>
                        <span className="addFlatInputLabel">Street Name </span>
                        <input className="addFlatInput" value={flat.address.streetName} onChange={(e) => changeStreetName(e)} type="text"/>
                    </div>
                    <div>
                        <span className="addFlatInputLabel">Building Number </span>
                        <input className="addFlatInput" value={flat.address.buildingNumberail} onChange={(e) => changeBuildingNumber(e)} type="text"/>
                    </div>
                    <div>
                        <span className="addFlatInputLabel">Post Code </span>
                        <input className="addFlatInput" value={flat.address.postCode} onChange={(e) => changePostCode(e)} type="text"/>
                    </div>
                    <div>
                        <span className="addFlatInputLabel">FlatNumber </span>
                        <input className="addFlatInput" value={flat.address.flatNumber} onChange={(e) => changeFlatNumber(e)} type="text"/>
                    </div>
                </div>
                <button id="cancelButton" onClick={() => onClickCancelButton()}>Cancel</button>
                <button id="submitButton" onClick={() => onClickSubmitButton()}>Submit</button>    
            </div>
            
        );
    }
    else
        return (<button onClick={() => onClickAddButton()}>Add Flat</button>);
}