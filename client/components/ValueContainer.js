import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import ValueInformation from './ValueInformation';

function mapStateToProps(stateIsNowProp) {
  return {
    stateIsNowProp
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const ValueContainer = connect(mapStateToProps, mapDispatchToProps)(ValueInformation);

export default ValueContainer;