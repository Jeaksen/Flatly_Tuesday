import React, { useState } from "react";
import { connect } from 'react-redux';
import { addNewFlat, flatListShowingForm } from '../Actions/flatsActions';
import {Form, Row, Col, Button, Card, CardDeck } from 'react-bootstrap';
import AddressForm from "./AddressForm";
import placeholder_img from '../../placeholder_img.png';
import Dropzone from 'react-dropzone-uploader';
import Preview from './Preview.tsx';

const mapDispatchToProps = (dispatch) => ({
  addNewFlat: flat => dispatch(addNewFlat(flat)),
  flatListShowingForm: (b) => dispatch(flatListShowingForm(b))
})

function FlatForm(props) {
  const [flat, setflat] = useState({
    id: Math.round((new Date()).getTime()),
    name: "",       
    maxGuests: 0,
    price: 0,
    flatType: "",
    address: {
      country: "", 
      city: "", 
      streetName: "", 
      postCode: "", 
      buildingNumber: "", 
      flatNumber: ""
    },
    images: []
  });

  const onflatChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setflat({...flat, [name]: value});
  }

  const onAddressChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setflat({
      ...flat,
      address: {
        ...flat.address,
        [name]: value
      }
    });
  }
  const handleChangeStatus = ({ meta }, status) => {
    if (status === 'done') {
      setflat({
        ...flat,
        images: [
          ...flat.images,
          meta
        ]
      });
    }
    else if (status === 'removed'){
      setflat({
        ...flat,
        images: flat.images.filter(item => item.name !== meta.name)
      });
    }
  }  

  const onSubmit = (flat) => {
    props.addNewFlat(flat);
    setflat({
      id: Math.round((new Date()).getTime()),
      name: "", 
      maxGuests: 0,
      price: 0,
      flatType: "",
      address: {
        country: "", 
        city: "", 
        streetName: "", 
        postCode: "", 
        buildingNumber: "", 
        flatNumber: ""
      },
      images: []
    });
  }

  return (
    <CardDeck>
      <Card bg="light" border="info"> 
        <Card.Body>
          <Form>
            <Form.Group as={Row} controlId="name">
              <Form.Label column sm="2">Name</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="name" value={flat.name} onChange={onflatChange} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="maxGuests">
              <Form.Label column sm="2">Max guests</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="maxGuests" value={flat.maxGuests} onChange={onflatChange} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="price">
              <Form.Label column sm="2">Price</Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="price" value={flat.price} onChange={onflatChange} />
              </Col>
            </Form.Group>
    
            <AddressForm
              address={flat.address}
              changingAddress={onAddressChange}
              //validate={onAddressFormValidating}
              isReadOnly={false} />
    
            <Button 
                variant="primary" 
                type="button" 
                onClick={() => onSubmit(flat)}>Submit</Button>
            <Button
                variant="danger" 
                type="button" 
                onClick={() => props.flatListShowingForm(false)}>Cancel</Button>
          </Form>
        </Card.Body>
      </Card>

      <Card bg="light" border="info">
        <Card.Img  src={placeholder_img} alt="Card image"/>
      </Card>

      <Card bg="light" border="info">
        <Card.Header>Uploaded Pictures</Card.Header>
        <Card.Body>
        <Dropzone
          onChangeStatus={handleChangeStatus}
          accept="image/*"
          PreviewComponent={Preview}
          styles={{ dropzone: { minHeight: 200, maxHeight: 600 },  inputLabelWithFiles: { alignSelf: 'center', backgroundColor: '#007bff', color: '#fff' }}}
          inputWithFilesContent= 'Upload new pictures'
          //initialFiles={flat.images}
        />
        </Card.Body>

      </Card>
    </CardDeck>
    )
}

export default connect(
  null,
  mapDispatchToProps
)(FlatForm)
