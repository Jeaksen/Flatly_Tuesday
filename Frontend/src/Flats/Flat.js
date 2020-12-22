import React from 'react';
import Address from './Address';
import "./FlatsList.css"

function Flat(props) {
    if (props.flat.deleting)
      return (<li className="Flat"><label>Deleting...</label></li>)
    else {
      return (
        <li className="Flat">
          <ul>
            {props.flat.isActive === true ? <li style={{color: "green"}}>ACTIVE</li> : <li style={{color: "red"}}>INACTIVE</li>}
            <li>{props.flat.name}</li>
            <Address address={props.flat.address}></Address>
          </ul>
          <button onClick={() => props.deleteFlat(props.flat.id)}>Delete</button>
        </li>
      );
    }
  }

export default Flat;


