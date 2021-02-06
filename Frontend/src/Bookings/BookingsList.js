import React, { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import DateSelect from './DateSelect';
import { connect } from 'react-redux';
import { loadBookingsListAsync, cancelBooking } from './Actions/bookingsListActions';
import BookingsListItem from "./BookingsListItem";
import "./BookingsList.css";

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
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState("");
    const [sortDir, setSortDir] = useState("desc");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(
        {
          startDate: null,
          endDate: null
        });

    useEffect(() => {props.loadBookingsListAsync()}, [])
    return (
        <div className="BookingsListPanel">
            <ul className="BookingsFilterPanel">
                <AsyncSelect className="single-select" classNamePrefix="select" 
                    isDisabled={false} isClearable={true} isRtl={false} isSearchable={true}
                    name="countrySelect"
                    placeholder="Select Country..."
                    cacheOptions
                    defaultOptions
                    loadOptions = {(inputValue, callback) => {
                      setTimeout(() => {
                          fetch("http://localhost:8080/countryOptions")
                              .then(promise => {return promise.status === 404 ? [] : promise.json()})
                              .then(json => callback(json.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))));
                        }, 1000)
                    }}
                    onChange={(opt) => { opt != null ? setCountry(opt.value) : setCountry("")}}
                />
                <AsyncSelect className="single-select" classNamePrefix="select" 
                    isDisabled={false} isClearable={true} isRtl={false} isSearchable={true}
                    name="citySelect"
                    placeholder="Select City..."
                    cacheOptions
                    defaultOptions
                    loadOptions = {(inputValue, callback) => {
                      setTimeout(() => {
                          fetch("http://localhost:8080/cityOptions")
                              .then(promise => {return promise.status === 404 ? [] : promise.json()})
                              .then(json => callback(json.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))));
                        }, 1000)
                    }}
                    onChange={(opt) => { opt != null ? setCountry(opt.value) : setCountry("")}}
                />
                <DateSelect />
                <input className="FlatNameInput" 
                    placeholder="Search by Flat's Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={() => {
                    let opt_str = `?size=${size}&page=${page}`;
                    if (sort !== "") opt_str += `&sort=${sort}&${sort}.dir=${sortDir}`;
                    if (name !== "") opt_str += `&name=${name}`;
                    if (country !== "") opt_str += `&country=${country}`;
                    if (city !== "") opt_str += `&city=${city}`;
                    if (date.startDate instanceof Date) opt_str += `&dateFrom=${date.startDate.getFullYear()}-${date.startDate.getMonth()}-${date.startDate.getDate()}`;
                    if (date.endDate instanceof Date) opt_str += `&dateTo=${date.endDate.getFullYear()}-${date.endDate.getMonth()}-${date.endDate.getDate()}`;
                    console.log(opt_str);
                    props.loadBookingsListAsync();
                    // props.loadBookingsListAsync(opt_str);
                }}>
                    Apply Filters
                </button>
            </ul>
            {props.loading ? <label>Loading...</label> : props.error ? <label>Fetch error</label> : props.bookings && props.bookings.length > 0 ?  
                <ul className="BookingsList">{props.bookings.map((booking) => {
                    return <BookingsListItem key={booking.id} booking={booking} cancelBooking={props.cancelBooking} />})}
                </ul> :
            <div />}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingsList);