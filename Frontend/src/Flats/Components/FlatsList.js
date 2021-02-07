import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { deleteFlat, loadFlatListAsync } from '../Actions/flatsActions';
import { Button, Alert, Form, Row, Col, Table, Modal } from 'react-bootstrap';
import Pagination from './Pagination';
import "../Layout/FlatsLayout.css"

const mapStateToProps = (state) => ({ 
  flats: state.flats.flats,
  pageNumber: state.flats.pageable.pageNumber,
  totalPages: state.flats.totalPages,
  loading: state.flats.loading,
  idDeleting: state.flats.idDeleting,
  error: state.flats.error
});

const mapDispatchToProps = (dispatch) => ({
  loadFlatListAsync: () => dispatch(loadFlatListAsync()),
  deleteFlat: (flatId) => dispatch(deleteFlat(flatId))
})

function FlatsList(props) {
  const [filteredCountries, setFilteredCountries] = useState([{id: 1, name: 'Poland'}, {id: 2, name: 'Germany'}]);
  const [filteredCities, setFilteredCities] = useState([{id: 1, name: 'Warsaw'}, {id: 2, name: 'Krakow'}, {id: 3, name: 'Munich'}]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {props.loadFlatListAsync();}, []);
  
  const onCountryFilterChange = event => {} //countryFilter(event.target.value);
  const onCityFilterChange = event => {} //cityFilter(event.target.value);
  const onMGLowerFilterChange = event => {} //maxGuestsFilter({ number: event.target.value, comparator: Comparator.GE });
  const onMGUpperFilterChange = event => {} //maxGuestsFilter({ number: event.target.value, comparator: Comparator.LE });
  const onPriceLowerFilterChange = event => {} //priceFilter({ number: event.target.value, comparator: Comparator.GE });
  const onPriceUpperFilterChange = event => {} //priceFilter({ number: event.target.value, comparator: Comparator.LE });
  const onNameFilterChange = event => {} //nameFilter(event.target.value);
  
  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleShowConfirmation = () => setShowConfirmation(true);
  const onDeleteFlat = (flatId) => {
    props.deleteFlat(flatId);
    setShowConfirmation(false);
  }

  const renderTableData = () => {
    return props.flats.map((flat, index) => (
        <tr key={index} className='FlatsRow'>
          <td>{flat.name}</td>
          <td>{flat.address.country}</td>
          <td>{flat.address.city}</td>
          <td>{flat.maxGuests}</td>
          <td>{flat.price}</td>
          <td disabled={props.idDeleting !== -1}>      
            <Button className='GreenButton' type="button" 
              href={`/flats/details/${flat.id}`}>Detail
            </Button>
            <Button className='BlueButton' type="button" 
              href={`/flats/edit/${flat.id}`}>Edit
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
                Are you sure to delete flat {flat.name}?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfirmation}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => onDeleteFlat(flat.id)}>Delete</Button>
              </Modal.Footer>
            </Modal>
        </tr>
      )
    )
  }

  return (
    <div className="FlatsList">
    {
      props.loading ? <Alert variant='primary'>Loading...</Alert> : 
        (props.error ? <Alert variant='danger'>Fetch error...</Alert> :
        <ul>
          {props.flats && props.flats.length > 0 ? 
          <div>
            <Form className='FlatsForm'>
              <Row>
                <Col>
                  <Form.Label>Search by Flat's name</Form.Label>
                  <Form.Control placeholder="Flat's name" type="text" onChange={onNameFilterChange} />
                </Col>
                <Col>
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select" onChange={onCountryFilterChange}>
                    <option disabled selected value> -- Select country -- </option>
                    {filteredCountries.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>City</Form.Label>
                  <Form.Control as="select" onChange={onCityFilterChange}>
                    <option disabled selected value> -- Select city -- </option>
                    {filteredCities.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>Max guests</Form.Label>
                  <Form.Control placeholder="Min" type="number" min={1} onChange={onMGLowerFilterChange} />
                  <Form.Control placeholder="Max" type="number" min={1} onChange={onMGUpperFilterChange} />
                </Col>
                <Col>
                  <Form.Label>Price</Form.Label>
                  <Form.Control placeholder="Min" type="number" onChange={onPriceLowerFilterChange} />
                  <Form.Control placeholder="Max" type="number" onChange={onPriceUpperFilterChange} />
                </Col>
                <Col>
                  <Button variant='light' type="button" className='ButtonAddFlat'
                      hidden={props.loading || props.saving}
                      disabled={props.idDeleting !== -1}
                      href={`/flats/add`}
                      size="lg">
                        Add new flat
                  </Button>
                </Col>
              </Row>
              <Row>
                <Table className='FlatsTable'>
                  <thead>
                    <tr>
                      <th>Flat name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th>Max guests</th>
                      <th>Price</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>{renderTableData()}</tbody>
                </Table>
              </Row>
            </Form>
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination />
            </div>
          </div>
          : <div></div>}
        </ul>
      )
    }
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(FlatsList);