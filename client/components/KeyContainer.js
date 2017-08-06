import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import KeyInformation from './KeyInformation';

function mapStateToProps(stateIsNowProp) {
  return {
    stateIsNowProp
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const KeyContainer = connect(mapStateToProps, mapDispatchToProps)(KeyInformation);

export default KeyContainer;