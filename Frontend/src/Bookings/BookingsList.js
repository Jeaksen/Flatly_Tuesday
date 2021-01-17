import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { loadBookingsListAsync, cancelBooking } from './Actions/bookingsActions'
import BookingsListItem from "./BookingsListItem";
import "./BookingsList.css"

const mapStateToProps = (state, ownProps) => ({ 
    bookings: state.bookings.list,
    loading: state.bookings.loading,
    saving: state.bookings.saving,
    error: state.bookings.error
});

const mapDispatchToProps = (dispatch) => ({
    loadBookingsListAsync: () => dispatch(loadBookingsListAsync()),
    cancelBooking: (bookingId) => dispatch(cancelBooking(bookingId))
})

function BookingsList(props)
{   
    useEffect(() => {props.loadBookingsListAsync()}, [])
    if (props.loading) {
        return (<label>Loading...</label>)
    }
    if (props.error) {
        return (<label>Fetch error</label>)
    }
    if (props.bookings && props.bookings.length > 0)
        return (
            <div className="BookingsListPanel">
                <ul className="BookingsList">{props.bookings.map((booking) => {
                        return <BookingsListItem key={booking.id} booking={booking} cancelBooking={props.cancelBooking} />
                    })}
                </ul>
            </div>
        )
    return <div />
}


export default connect(mapStateToProps, mapDispatchToProps)(BookingsList);