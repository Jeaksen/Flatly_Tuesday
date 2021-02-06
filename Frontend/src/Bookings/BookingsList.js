import React, { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import DateSelect from './DateSelect';
import { connect } from 'react-redux';
import { loadBookingsListAsync, cancelBooking } from './Actions/bookingsListActions';
import BookingsListItem from "./BookingsListItem";
import "./BookingsList.css";
import "../BasicInputField.css"

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
    const [startDate, setStartDate] = useState({
        value: 'null',
    });
    const { startDateWrap } = startDate;
    const [endDate, setEndDate] = useState({
        value: 'null',
    });
    const { endDateWrap } = endDate;

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
                <DateSelect placeholder="Select Start Date..." value={startDateWrap} onChange={value => setStartDate({ value })} />
                <DateSelect placeholder="Select End Date..." value={endDateWrap} onChange={value => setEndDate({ value })} />
                <input className="BasicInputField" 
                    placeholder="Search by Flat's Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={() => {
                    let opt_str = `?size=${size}&page=${page}`;
                    if (sort !== "") opt_str += `&sort=${sort}&${sort}.dir=${sortDir}`;
                    if (name !== "") opt_str += `&name=${name}`;
                    if (country !== "") opt_str += `&country=${country}`;
                    if (city !== "") opt_str += `&city=${city}`;
                    if (startDate.value != null) opt_str += `&dateFrom=${startDate.value.value.getFullYear()}-${startDate.value.value.getMonth()}-${startDate.value.value.getDate()}`;
                    if (endDate.value != null) opt_str += `&dateTo=${endDate.value.value.getFullYear()}-${endDate.value.value.getMonth()}-${endDate.value.value.getDate()}`;
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