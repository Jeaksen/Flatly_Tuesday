import React, { useState } from "react";
import { connect } from 'react-redux';
import { addNewFlat, adjustForm } from '../Actions/flatsActions';
import {Form, Row, Col, Button, Card, CardDeck } from 'react-bootstrap';
import AddressForm from "./AddressForm";
import placeholder_img from '../../placeholder_img.png';
import FlatImageDropzone from './FlatImageDropzone'

const mapDispatchToProps = (dispatch) => ({
  addNewFlat: flat => dispatch(addNewFlat(flat)),
  adjustForm: (b) => dispatch(adjustForm(b))
})

function FlatForm(props) {
  const initialFlat = {
    id: Math.round((new Date()).getTime()),
    name: "",       
    maxGuests: 1,
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
  }
  
  const [flat, setflat] = useState(initialFlat);
  const [files, setFiles] = useState([]);
  const [showedImg, setShowedImg] = useState(placeholder_img);

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

  const onAddingFiles = (acceptedFiles) => {
    const currentFileNames = files.map(f => f.name);
    const filteredAddedFiles = acceptedFiles.filter(file => currentFileNames.indexOf(file.name) === -1);
    setFiles([
      ...files,
      ...filteredAddedFiles.map(file => ({fileValue: file, preview: URL.createObjectURL(file)}))
    ]);
    // filteredAddedFiles.forEach((file) => {
    //   const reader = new FileReader();
    //   reader.onabort = () => console.log('file reading was aborted');
    //   reader.onerror = () => console.log('file reading has failed');
    //   reader.onload = () => {
    //     const array = new Int8Array(reader.result);
    //     setflat({...flat, images: [...flat.images, { key: file.name, value: array}]});
    //   }//JSON.stringify(array, null, '  ')
    //   reader.readAsArrayBuffer(file);
    // });
  }

  const onRemovingFile = (file) =>  {
    URL.revokeObjectURL(file.preview);
    const filesAferRemoving = files.filter(f => f.fileValue.name !== file.fileValue.name);
    setFiles(filesAferRemoving);
    //setflat({...flat, images: flat.images.filter(f => f.key !== file.name)});
  }

  const onSubmit = async (flat) => {
    props.addNewFlat(flat);
    setInitial();
  }

  const onCancel = () => {
    setInitial();
    props.adjustForm(false);
  }

  function setInitial() {
    setflat(initialFlat);
    files.forEach(file => URL.revokeObjectURL(file.preview));
    setFiles([]);
    setShowedImg(placeholder_img);
  }

  return (
    <div >
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
                <Form.Control type="number" min={1} name="maxGuests" value={flat.maxGuests} onChange={onflatChange} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="price">
              <Form.Label column sm="2">Price</Form.Label>
              <Col sm="10">
                <Form.Control type="number" name="price" value={flat.price} onChange={onflatChange} />
              </Col>
            </Form.Group>
    
            <AddressForm
              address={flat.address}
              changingAddress={onAddressChange}
              //validate={onAddressFormValidating}
              isReadOnly={false} />
    

          </Form>
        </Card.Body>
      </Card>

      <Card style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Card.Img  src={showedImg}/>
      </Card>

      <Card bg="light" border="info">
        <Card.Header>Uploaded Pictures</Card.Header>
        <Card.Body>
        <FlatImageDropzone 
          files = {files}
          onAddingFiles = {onAddingFiles} 
          onRemovingFile = {onRemovingFile}
          onShowingImg= {(img) => setShowedImg(img)}/>
        </Card.Body>

      </Card>
    </CardDeck>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Button variant="primary" type="button" onClick={() => onSubmit(flat)}>Submit</Button>
      <Button variant="danger" type="button" onClick={onCancel}>Cancel</Button>
    </div>
    </div>)
}

export default connect(
  null,
  mapDispatchToProps
)(FlatForm)
