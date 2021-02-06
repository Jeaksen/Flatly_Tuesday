import React, { useState } from "react";
import { connect } from 'react-redux';
import { addNewFlat } from '../Actions/flatsActions';
import {Form, Row, Col, Button, Card, CardDeck, Alert } from 'react-bootstrap';
import AddressForm from "./AddressForm";
import placeholder_img from '../../placeholder_img.png';
import FlatImageDropzone from './FlatImageDropzone';
import "../Layout/FlatsLayout.css"

const mapStateToProps = (state) => ({saving: state.flats.saving})
const mapDispatchToProps = (dispatch) => ({addNewFlat: (flat, uploadedFiles) => dispatch(addNewFlat(flat, uploadedFiles))})

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
  const [clickedRow, setClickedRow] = useState(0);

  const onAddingFiles = (acceptedFiles) => {
    const currentFileNames = files.map(f => f.name);
    const filteredAddedFiles = acceptedFiles.filter(file => currentFileNames.indexOf(file.name) === -1);
    const newFiles = [
      ...files,
      ...filteredAddedFiles.map(file => (
        {
          file: file, 
          fileName: file.name,
          fileType: file.type,
          flatId: flat.id,
          preview: URL.createObjectURL(file)
        }))
    ]
    setFiles(newFiles);
    onRowClick(0, newFiles[0].preview);
  }

  const onRemovingFile = (e, index, preview) =>  {
    e.stopPropagation();
    URL.revokeObjectURL(preview);
    const newFiles = [...files];
    newFiles.splice(index, 1);  
    setFiles(newFiles);

    let newIndex = index;
    let newImgPreview = placeholder_img;
    if (index == newFiles.length && newFiles.length != 0) {
      newIndex = index - 1;
      newImgPreview = newFiles[newIndex].preview;
    } else if (index < newFiles.length) {
      newImgPreview = newFiles[newIndex].preview;
    }
    onRowClick(newIndex, newImgPreview);
  }

  const onRowClick = (rowIndex, preview) => {
    setClickedRow(rowIndex);
    setShowedImg(preview ?? placeholder_img);
  }

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

  const onSubmit = async () => {
    const uploadedFiles = files.map(f => f.file);
    props.addNewFlat(flat, uploadedFiles);
    //files.forEach(file => URL.revokeObjectURL(file.preview));
    window.location.href = "/flats";
  }

  const onCancel = () => {
    //files.forEach(file => URL.revokeObjectURL(file.preview));
    window.location.href = "/flats";
  }

  return (
    <div className='FlatForm' >
      <div hidden={!props.saving}><Alert variant='primary'>Saving...</Alert></div>
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
            clickedRow = {clickedRow}
            onAddingFiles = {onAddingFiles} 
            onRemovingFile = {onRemovingFile}
            onRowClick= {onRowClick}/>
          </Card.Body>

        </Card>
      </CardDeck>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Button variant="primary" type="button" onClick={onSubmit}>Submit</Button>
        <Button variant="danger" type="button" onClick={onCancel}>Cancel</Button>
      </div>
    </div>)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlatForm)
