import React from 'react';

function Address(props) {
  return (
    <li className="Address">
      <ul>
        <li>{props.address.country}</li>
        <li>{props.address.city}</li>
        <li>{props.address.postCode}</li>
        <li>{`${props.address.streetName} ${props.address.buildingNumber}/${props.address.flatNumber}`}</li>
      </ul>
    </li>
  );
}

export default Address;