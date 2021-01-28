import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
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
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

    const countryOptions = [
        { value: 'poland', label: 'Poland' },
        { value: 'england', label: 'England' },
        { value: 'russia', label: 'Russia' },
        { value: 'arstotzka', label: 'Arstotzka' }
    ]
    const cityOptions = [
        { value: 'warsaw', label: 'Warsaw' },
        { value: 'moscow', label: 'Moscow' },
        { value: 'london', label: 'London' }
    ]

    useEffect(() => {props.loadBookingsListAsync()}, [])
    return (
        <div className="BookingsListPanel">
            <ul className="BookingsFilterPanel">
                <SingleSelect 
                    name="countrySelect"
                    placeholder="Select Country..."
                    options={countryOptions}
                    onChange={(opt) => { opt != null ? setCountry(opt.value) : setCountry("")}}
                />
                <SingleSelect 
                    name="citySelect"
                    placeholder="Select City..."
                    options={cityOptions} onChange={(opt) => { opt != null ? setCity(opt.value) : setCity("")}}
                />
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    color={"#ff9900"}
                />
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
                    console.log(date);
                    console.log(opt_str);
                    props.loadBookingsListAsync();
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

function SingleSelect (props)
{
    return(
        <Select
          className="single-select"
          classNamePrefix="select"
          isDisabled={false}
          isLoading={false}
          isClearable={true}
          isRtl={false}
          isSearchable={true}
          name={props.name}
          placeholder={props.placeholder}
          options={props.options}
          onChange={props.onChange}
        />
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingsList);