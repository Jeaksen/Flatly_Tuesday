import React, { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import DateSelect from './DateSelect';
import { connect } from 'react-redux';
import { loadBookingsListAsync, cancelBooking } from './Actions/bookingsListActions';
import { Button, Alert, Form, Row, Col, Table, Modal } from 'react-bootstrap';
import "./BookingsLayout.css";
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
    const [showConfirmation, setShowConfirmation] = useState(false);
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
    // return (
    //     <div className="BookingsListPanel">
    //         <ul className="BookingsFilterPanel">
    //             <AsyncSelect className="single-select" classNamePrefix="select" 
    //                 isDisabled={false} isClearable={true} isRtl={false} isSearchable={true}
    //                 name="countrySelect"
    //                 placeholder="Select Country..."
    //                 cacheOptions
    //                 defaultOptions
    //                 loadOptions = {(inputValue, callback) => {
    //                     setTimeout(() => {
    //                         fetch("http://localhost:8080/countryOptions")
    //                             .then(promise => {return promise.status === 404 ? [] : promise.json()})
    //                             .then(json => callback(json.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))));
    //                     }, 1000)
    //                 }}
    //                 onChange={(opt) => { opt != null ? setCountry(opt.value) : setCountry("")}}
    //             />
    //             <AsyncSelect className="single-select" classNamePrefix="select" 
    //                 isDisabled={false} isClearable={true} isRtl={false} isSearchable={true}
    //                 name="citySelect"
    //                 placeholder="Select City..."
    //                 cacheOptions
    //                 defaultOptions
    //                 loadOptions = {(inputValue, callback) => {
    //                     setTimeout(() => {
    //                         fetch("http://localhost:8080/cityOptions")
    //                             .then(promise => {return promise.status === 404 ? [] : promise.json()})
    //                             .then(json => callback(json.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))));
    //                     }, 1000)
    //                 }}
    //                 onChange={(opt) => { opt != null ? setCountry(opt.value) : setCountry("")}}
    //             />
    //             <DateSelect placeholder="Select Start Date..." value={startDateWrap} onChange={value => setStartDate({ value })} />
    //             <DateSelect placeholder="Select End Date..." value={endDateWrap} onChange={value => setEndDate({ value })} />
    //             <input className="BasicInputField" 
    //                 placeholder="Search by Flat's Name"
    //                 onChange={(e) => setName(e.target.value)}
    //             />
    //             <button onClick={() => {
    //                 let opt_str = `?size=${size}&page=${page}`;
    //                 if (sort !== "") opt_str += `&sort=${sort}&${sort}.dir=${sortDir}`;
    //                 if (name !== "") opt_str += `&name=${name}`;
    //                 if (country !== "") opt_str += `&country=${country}`;
    //                 if (city !== "") opt_str += `&city=${city}`;
    //                 if (startDate.value != null) opt_str += `&dateFrom=${startDate.value.value.getFullYear()}-${startDate.value.value.getMonth()}-${startDate.value.value.getDate()}`;
    //                 if (endDate.value != null) opt_str += `&dateTo=${endDate.value.value.getFullYear()}-${endDate.value.value.getMonth()}-${endDate.value.value.getDate()}`;
    //                 console.log(opt_str);
    //                 props.loadBookingsListAsync();
    //                 // props.loadBookingsListAsync(opt_str);
    //             }}>
    //                 Apply Filters
    //             </button>
    //         </ul>
    //         {props.loading ? <label>Loading...</label> : props.error ? <label>Fetch error</label> : props.bookings && props.bookings.length > 0 ?  
    //             <ul className="BookingsList">{props.bookings.map((booking) => {
    //                 return <BookingsListItem key={booking.id} booking={booking} cancelBooking={props.cancelBooking} />})}
    //             </ul> :
    //         <div />}
    //     </div>
    // );

  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleShowConfirmation = () => setShowConfirmation(true);
  const onDeleteBooking = (bookingId) => {
    props.cancelBooking(bookingId);
    setShowConfirmation(false);
  }

  const renderTableData = () => {
    return props.bookings.map((booking) => (
        <tr key={booking.id} className='BookingsRow'>
          <td>{booking.customer.name} {booking.customer.surname}</td>
          <td>{booking.flat.name}</td>
          <td>{booking.flat.address.country}</td>
          <td>{booking.flat.address.city}</td>
          <td>{booking.startDate} - {booking.endDate}</td>
          <td disabled={props.idDeleting !== -1}>      
          <Button className='GreenButton' type="button" 
            href={`/bookings/details/${booking.id}`}>Detail
          </Button>
          <Button className='RedButton' type="button" 
            onClick={handleShowConfirmation}>Delete
          </Button>
        </td>
          <Modal
              show={showConfirmation}
              onHide={handleCloseConfirmation}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure to delete the booking?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfirmation}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => onDeleteBooking(booking.id)}>Delete</Button>
              </Modal.Footer>
            </Modal>
        </tr>
      )
    )
  }

    return (
        <div className="BookingsList">
        {
          props.loading ? <Alert variant='primary'>Loading...</Alert> : 
            (props.error ? <Alert variant='danger'>Fetch error...</Alert> :
            <ul>
              {props.bookings && props.bookings.length > 0 ? 
              <div>
                <Form className='BookingsForm'>
                  <Row>
                    <Col>
                      <Form.Label>Search by Flat's name</Form.Label>
                      <Form.Control classname="BasicInputField" placeholder="Flat's name" type="text" />
                    </Col>
                    <Col>
                      <Form.Label>Country</Form.Label>
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
                    </Col>
                    <Col>
                      <Form.Label>City</Form.Label>
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
                    </Col>
                    <Col>
                      <Form.Label>Date From</Form.Label>
                      <DateSelect placeholder="Select Start Date..." value={startDateWrap} onChange={value => setStartDate({ value })} />
                    </Col>
                    <Col>
                      <Form.Label>Date To</Form.Label>
                      <DateSelect placeholder="Select End Date..." value={endDateWrap} onChange={value => setEndDate({ value })} />
                    </Col>
                  </Row>
                  <Row>
                    <Table className='BookingsTable'>
                      <thead>
                        <tr>
                          <th>Name and Surname</th>
                          <th>Flat name</th>
                          <th>Country</th>
                          <th>City</th>
                          <th>Date</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>{renderTableData()}</tbody>
                    </Table>
                  </Row>
                </Form>
                {/* <div className="d-flex flex-row py-4 align-items-center">
                  <Pagination />
                </div> */}
              </div>
              : <div></div>}
            </ul>
          )
        }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingsList);