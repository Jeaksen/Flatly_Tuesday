import React, {useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import placeholder_img from '../../placeholder_img.png';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  height: '100%',
  width: '100%'
};
const activeStyle = {borderColor: '#2196f3'};
const acceptStyle = {borderColor: '#00e676'};
const rejectStyle = {borderColor: '#ff1744'};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 50,
  height: 50,
  padding: 4,
  boxSizing: 'border-box'
};
const thumbInner = {display: 'flex',minWidth: 0,overflow: 'hidden'};
const img = {display: 'block',width: 'auto',height: '100%'};

function FlatImageDropzone(props) {
  const {getRootProps, getInputProps, open, isDragActive, isDragAccept, isDragReject} = useDropzone({
    accept: 'image/*', maxFiles: 20, noClick: true, noKeyboard: true,
    onDrop: (acceptedFiles) => { 
      props.onAddingFiles(acceptedFiles);
    }
  });
  const [clickedRow, setClickedRow] = useState(0);

  const prettyBytes = require('pretty-bytes');
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [isDragActive,isDragReject,isDragAccept]);
  
  const headerStyleFileTable = () => {return { width: 0 , 'visibility': 'hidden'}}
  const columns = [{
    dataField: 'preview',
    headerStyle: headerStyleFileTable,
    formatter: (cellContent, row) => (
      <div style={thumb} key={row.id}>
        <div style={thumbInner}>
          <img src={cellContent} style={img} />
        </div>
      </div>)
  }, { 
    dataField: 'fileValue.name',
    headerStyle: headerStyleFileTable
  }, {
    dataField: 'fileValue.size',    
    headerStyle: headerStyleFileTable,
    formatter: (cellContent) => (<span>{prettyBytes(cellContent)}</span>)
  }, {
    dataField: 'cancel',
    isDummyField: true,   
    headerStyle: headerStyleFileTable,
    formatter: (cellContent, row) => (
      <Button variant="danger" type="button" 
        onClick={() => props.onRemovingFile(row)} >X
      </Button>
    )
  }];

  const rowStyle = (row, rowIndex) => {
    if (rowIndex === clickedRow) {
      rowEvents.onClick(null, row, rowIndex);
      return {backgroundColor: '#24a0ed' };
    }
  };

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      setClickedRow(rowIndex);
      props.onShowingImg(row.preview ?? placeholder_img);
    }
  };
  return (
    <div {...getRootProps({style})} >
      <input {...getInputProps()} />
      <div style={{height:'90%', maxHeight: '600px', overflow: 'scroll'}}>
        <BootstrapTable keyField='name' 
          data={ props.files } 
          columns={ columns }  
          rowEvents={ rowEvents }
          rowStyle={ rowStyle } />
      </div>
      <Button variant="primary" type="button" style={{position: 'absolute', bottom: 20}}
        onClick={open}>UPLOAD MORE IMAGES
      </Button>
      {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
    </div>

  );
}

export default FlatImageDropzone;