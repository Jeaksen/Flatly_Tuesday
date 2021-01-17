import React from 'react';
import Address from './Address';
import "./BookingsList.css"

function BookingsListItem(props) {
    if (props.booking.canceling)
      return (<li className="BookingsListItem"><label>Canceling...</label></li>)
    else {
      return (
        <li className="BookingsListItem">
          <ul>
            <li>{`Name and Surname: ${props.booking.customer.name} ${props.booking.customer.surname}`}</li>
            <li>{`Contact Number: ${props.booking.customer.phoneNo}`}</li>
            <li>{`Number of Guests: ${props.booking.noOfGuests}`}</li>
            <li>{`Booking Price: ${props.booking.bookingPrice}`}</li>
            <li>{`Date: ${props.booking.startDate} - ${props.booking.endDate}`}</li>
            <li>{`Flat Name: ${props.booking.flat.name}`}</li>
            <li>{`Flat Type: ${props.booking.flat.flatType}`}</li>
            <li>{`Flat Max Guests: ${props.booking.flat.maxGuests}`}</li>
            <li>{`Flat Price Per Day: ${props.booking.flat.pricePerDay}`}</li>
            <Address address={props.booking.flat.address}></Address>
          </ul>
          <button onClick={() => props.cancelBooking(props.booking.id)}>Cancel</button>
        </li>
      );
    }
  }

export default BookingsListItem;
