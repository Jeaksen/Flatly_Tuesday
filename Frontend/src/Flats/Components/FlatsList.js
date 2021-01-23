import React, { useState } from "react";
import { connect } from 'react-redux';
import { deleteFlat, flatListShowingForm } from '../Actions/flatsActions';
import { Button, Alert, Form, Row, Col } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, numberFilter, selectFilter, Comparator  } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import "../FlatsList.css"
const mapStateToProps = (state) => ({ 
  flats: state.flats.flats,
  loading: state.flats.loading,
  saving: state.flats.saving,
  isShowingForm: state.flats.isShowingForm,
  idDeleting: state.flats.idDeleting,
  error: state.flats.error
});

const mapDispatchToProps = (dispatch) => ({
  deleteFlat: (flatId) => dispatch(deleteFlat(flatId)),
  flatListShowingForm: (b) => dispatch(flatListShowingForm(b))
})

function FlatsList(props) {
  let nameFilter;
  let countryFilter;
  let cityFilter;
  let maxGuestsFilter;
  let priceFilter;

  const [filteredCountries, setFilteredCountries] = useState([{id: 1, name: 'Poland'}, {id: 2, name: 'Germany'}]);
  const [filteredCities, setFilteredCities] = useState([{id: 1, name: 'Warsaw'}, {id: 2, name: 'Krakow'}, {id: 3, name: 'Munich'}]);
  const rowStyle = { backgroundColor: '#F0E68C'};
  const headerStyle = {
    color: '#e2e3e5',
    backgroundColor: '#343a40'
  };
  const columns = [{
    dataField: 'name',
    text: 'Flat name',
    filter: textFilter({
      style: { display: 'none' },
      getFilter: (filter) => { nameFilter = filter; }
    }),
    headerAlign: 'center',
    headerStyle: headerStyle
  }, {
    dataField: 'address.country',
    text: 'Country',
    filter: selectFilter({
      style: { display: 'none' },
      options: filteredCountries.map(x => x.name), 
      getFilter: (filter) => { countryFilter = filter; }
    }),
    headerAlign: 'center',
    headerStyle: headerStyle
  }, {
    dataField: 'address.city',
    text: 'City',
    filter: selectFilter({
      style: { display: 'none' },
      options: filteredCities.map(x => x.name), 
      getFilter: (filter) => { cityFilter = filter; }
    }),
    headerAlign: 'center',
    headerStyle: headerStyle
  }, {
    dataField: 'maxGuests',
    text: 'Max guests',
    filter: numberFilter({
      numberStyle: { display: 'none' },
      comparatorStyle: {display: 'none' },
      getFilter: (filter) => { maxGuestsFilter = filter; }
    }),
    headerAlign: 'center',
    headerStyle: headerStyle
  }, {
    dataField: 'price',
    text: 'Price',
    filter: numberFilter({
      numberStyle: { display: 'none' },
      comparatorStyle: {display: 'none' },
      getFilter: (filter) => { priceFilter = filter; }
    }),
    headerAlign: 'center',
    headerStyle: headerStyle
  }, {
    dataField: 'options',
    isDummyField: true,
    text: 'Options',
    formatter: (cellContent, row) => (
      <Button variant="danger" type="button" 
        onClick={() => props.deleteFlat(row.id)}
        disabled={props.idDeleting !== -1 || props.saving}>Delete
      </Button>
    ),
    headerAlign: 'center',
    headerStyle: headerStyle
  }];
  const onCountryFilterChange = event => countryFilter(event.target.value);
  const onCityFilterChange = event => cityFilter(event.target.value);
  const onMGLowerFilterChange = event => maxGuestsFilter({ number: event.target.value, comparator: Comparator.GE });
  const onMGUpperFilterChange = event => maxGuestsFilter({ number: event.target.value, comparator: Comparator.LE });
  const onPriceLowerFilterChange = event => priceFilter({ number: event.target.value, comparator: Comparator.GE });
  const onPriceUpperFilterChange = event => priceFilter({ number: event.target.value, comparator: Comparator.LE });
  const onNameFilterChange = event => nameFilter(event.target.value);
  return (
    <div>
    {
      props.loading ? <Alert variant='primary'>Loading...</Alert> : 
        (props.error ? <Alert variant='danger'>Fetch error...</Alert> :
        <ul>
          {props.flats && props.flats.length > 0 ? 
          <Form>
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
                <Button variant="primary" type="button"
                    hidden={props.loading || props.isShowingForm || props.saving}
                    disabled={props.idDeleting !== -1}
                    onClick={() => props.flatListShowingForm(true)}>
                      Add new flat
                </Button>
              </Col>
            </Row>
            <Row>
              <BootstrapTable keyField='id' 
                data={ props.flats } 
                columns={ columns } 
                filter={ filterFactory() }
                pagination={ paginationFactory({hideSizePerPage: true}) } 
                rowStyle = {rowStyle}
              />
            </Row>
          </Form>
          : <div></div>}
        </ul>
      )
    }
    </div>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(FlatsList);