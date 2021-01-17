import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadFlatListAsync, flatListShowingForm } from '../Actions/flatsActions';
import FlatsList from './FlatsList';
import FlatForm from './FlatForm';
import {Button, Alert} from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    flats: state.flats.flats,
    loading: state.flats.loading,
    saving: state.flats.saving,
    isShowingForm: state.flats.isShowingForm,
    idDeleting: state.flats.idDeleting
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadFlatListAsync: () => dispatch(loadFlatListAsync()),
  flatListShowingForm: (b) => dispatch(flatListShowingForm(b))
})

function FlatsManagement(props) {
  useEffect(() => {
    props.loadFlatListAsync();
  }, []);

  return (
    <div>
      <div hidden={props.loading || !props.isShowingForm} >
        <FlatForm />
      </div>
      <div class="text-center">
        <Button variant="primary" type="button"
            hidden={props.loading || props.isShowingForm || props.saving}
            disabled={props.idDeleting !== -1}
            onClick={() => props.flatListShowingForm(true)}>
              Add new flat
        </Button>
      </div>
      <div hidden={!props.saving}><Alert variant='primary'>Saving...</Alert></div>
      <div hidden={props.isShowingForm}><FlatsList /></div>

    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlatsManagement);
