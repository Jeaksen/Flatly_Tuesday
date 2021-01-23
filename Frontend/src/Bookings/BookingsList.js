import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { loadBookingsListAsync, cancelBooking } from './Actions/bookingsListActions'
import BookingsListItem from "./BookingsListItem";
import "./BookingsList.css"
import BookingDetails from "./BookingDetails";

import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

const mapStateToProps = (state, ownProps) => ({ 
    bookings: state.bookingsList.list,
    loading: state.bookingsList.loading,
    saving: state.bookingsList.saving,
    error: state.bookingsList.error
});

const mapDispatchToProps = (dispatch) => ({
    loadBookingsListAsync: () => dispatch(loadBookingsListAsync()),
    cancelBooking: (bookingId) => dispatch(cancelBooking(bookingId))
})

function BookingsList(props)
{   
    let match = useRouteMatch();

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
                <Switch>
                    <Route path={`${match.url}/details/:bookingId`}>
                        <BookingDetails />
                    </Route>
                    <Route path={match.path}>
                        <ul className="BookingsList">{props.bookings.map((booking) => {
                            return <BookingsListItem key={booking.id} booking={booking} detailsBooking={<Link to={`${match.url}/details/${booking.id}`}><button>Details</button></Link>} cancelBooking={props.cancelBooking} />})}
                        </ul>
                    </Route>
                </Switch>
            </div>
        )
    return <div />
}


export default connect(mapStateToProps, mapDispatchToProps)(BookingsList);