import React from "react";
import { connect } from 'react-redux';
import { deleteFlat } from '../Actions/flatsActions';
import { Button, Alert } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter  } from 'react-bootstrap-table2-filter';
import "../FlatsList.css"

const mapStateToProps = (state) => ({ 
    flats: state.flats.flats,
    loading: state.flats.loading,
    saving: state.flats.saving,
    idDeleting: state.flats.idDeleting,
    error: state.flats.error
});

const mapDispatchToProps = (dispatch) => ({
    deleteFlat: (flatId) => dispatch(deleteFlat(flatId))
})

function FlatsList(props) {
  const columns = [{
    dataField: 'name',
    text: 'Flat name',
    filter: textFilter()
  }, {
    dataField: 'address.country',
    text: 'Country'
  }, {
    dataField: 'address.city',
    text: 'City'
  }, {
    dataField: 'maxGuests',
    text: 'Max guests'
  }, {
    dataField: 'price',
    text: 'Price'
  }, {
    dataField: 'options',
    isDummyField: true,
    text: 'Options',
    formatter: (cellContent, row) => (
      <Button variant="danger" type="button" 
        onClick={() => props.deleteFlat(row.id)}
        disabled={props.idDeleting !== -1 || props.saving}>Delete
      </Button>
    )
  }];
  return (
    <div>
    {
      props.loading ? <Alert variant='primary'>Loading...</Alert> : 
        (props.error ? <Alert variant='danger'>Fetch error...</Alert> :
        <ul>
          {props.flats && props.flats.length > 0 ? 
          // <Table striped bordered hover size="sm">
          //   <thead>
          //     <tr>
          //       <th>Flat name</th>
          //       <th>Country</th>
          //       <th>City</th>
          //       <th>Max guests</th>
          //       <th>Price</th>
          //       <th>Options</th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {props.flats.map(fl => 
          //     <tr>
          //       <td>{getCellValue(fl.id, fl.name)}</td>
          //       <td>{getCellValue(fl.id, fl.address.country)}</td>
          //       <td>{getCellValue(fl.id, fl.address.city)}</td>
          //       <td>{getCellValue(fl.id, fl.maxGuests)}</td>
          //       <td>{getCellValue(fl.id, fl.price)}</td>
          //       <td><Button 
          //         variant="danger" type="button" 
          //         onClick={() => props.deleteFlat(fl.id)}
          //         disabled={props.idDeleting !== -1 || props.saving}>Delete
          //       </Button></td>
          //     </tr>)}
          //   </tbody>
          // </Table>
          <BootstrapTable keyField='id' 
            data={ props.flats } 
            columns={ columns } 
            headerClasses="header-class"
            filter={ filterFactory() }
          />
          : <div></div>}
        </ul>
      )
    }
    </div>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(FlatsList);