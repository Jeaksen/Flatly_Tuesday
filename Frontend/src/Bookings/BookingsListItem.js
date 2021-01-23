import React from 'react';
import "./BookingsList.css"

function BookingsListItem(props) {
  if (props.booking.canceling)
    return (<li className="BookingsListItem"><label>Canceling...</label></li>)
  else {
    return (
      <li className="BookingsListItem">
        <ul>
          <li>{`Name and Surname: ${props.booking.customer.name} ${props.booking.customer.surname}`}</li>
          <li>{`Flat Name: ${props.booking.flat.name}`}</li>
          <li>{`Country: ${props.booking.flat.address.country}`}</li>
          <li>{`City: ${props.booking.flat.address.city}`}</li>
          <li>{`Date: ${props.booking.startDate} - ${props.booking.endDate}`}</li>
        </ul>
        {props.detailsBooking}
        <button onClick={() => props.cancelBooking(props.booking.id)}>Cancel</button>
      </li>
    );
  }
}

export default BookingsListItem;
