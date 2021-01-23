import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { loadBookingDetailsAsync } from './Actions/bookingDetailsActions'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import "./BookingDetails.css"

const mapStateToProps = (state, ownProps) => ({ 
    booking: state.bookingDetails.booking,
    loading: state.bookingDetails.loading,
    saving: state.bookingDetails.saving,
    error: state.bookingDetails.error
});

const mapDispatchToProps = (dispatch) => ({
    loadBookingDetailsAsync: (bookingId) => dispatch(loadBookingDetailsAsync(bookingId)),
})

function BookingDetails(props) {
    let { bookingId } = useParams();
    useEffect(() => {props.loadBookingDetailsAsync(bookingId)}, [])
    if (props.loading) {
        return (<label>Loading...</label>)
    }
    if (props.error) {
        return (<label>Fetch error</label>)
    }
    if (props.booking)
        return (
            <div className="BookingDetails">
                <ul>
                    <li>{`Person renting: ${props.booking.customer.name} ${props.booking.customer.surname}`}</li>
                    <li>{`Date: ${props.booking.startDate} - ${props.booking.endDate}`}</li>
                    <li>{`Contact Number: ${props.booking.customer.phoneNo}`}</li>
                    <li>{`Booking Price: ${props.booking.bookingPrice}`}</li>
                    <li>{`Number of Guests: ${props.booking.noOfGuests}`}</li>
                    <li>{`Flat Name: ${props.booking.flat.name}`}</li>
                    <ul>
                        <li>{`Country: ${props.booking.flat.address.country}`}</li>
                        <li>{`City: ${props.booking.flat.address.city}`}</li>
                        <li>{`Address: ${props.booking.flat.address.streetName} ${props.booking.flat.address.buildingNumber}/${props.booking.flat.address.flatNumber}`}</li>
                    </ul>
                    <Link to={`/flats/details/${props.booking.flat.id}`}>
                        <button>Go to flat details</button>
                    </Link>
                </ul>
            </div>
        )
    return (<div>Fail</div>)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails);